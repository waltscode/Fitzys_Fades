const { User, Appointment, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/Auth");

const ADMIN_KEY = process.env.ADMIN_KEY || '1234567890'; // for demo or dev only

const resolvers = {
  Query: {
    // Get all users with appointments populated
    users: async () => {
      return await User.find({}).populate("appointments");
    },
    // Get a single user by ID with appointments populated
    user: async (_, { id }) => {
      return await User.findById(id).populate("appointments");
    },

        //alternative approach I was considering for get all with an if statement (not args) to check if the user is an admin and if not then get all appointments for the user   -- comment back in for user dashboard operation
    // appointments: async (_, args, context) => {
    // // to ensure the user is logged in
    // if (!context.user) {
    //   throw new Error('You must be logged in.');
    // }
    
    // //if the user is an admin, return all appointments
    // if (context.user.role === 'admin') {
    //   return await Appointment.find({}).populate("user");
    // }

    // // for non-admin users, return only their relevant appointments
    // return await Appointment.find({ 'user._id': context.user._id }).populate("user");
    // },

    //I think get all appointments will need an added authentication check so only barbers can see all the appointments
    // Get all appointments
    appointments: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Not a barber.');
      }
      // not sure if i need to include arguments in the function to get all appointments

      
      return await Appointment.find({}).populate("user"); // <--- for returning all appointments
    },

    // Get a single appointment by ID
    appointment: async (_, { id }) => {
      return await Appointment.findById(id);
    },
    //  Get all messages
    messages: async (_, __, context) => {
      //I think I will need John M's help with implementing barber authentication check here. Currently placeholder)
      // if (!context.user.isBarber){
      //   throw new AuthenticationError("You don't not have permission to view messages")
      // }
      return await Message.find({});
    },
    // Get a single message by ID
    message: async (_, { id }, context) => {
      //I think I will need John M's help with implementing barber authentication check here. Currently placeholder)
      if (!context.user.isBarber) {

        throw new AuthenticationError("You don't not have permission to view this message")

      }
      return await Message.findById(id);
    },
    me: async (_, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate("appointments");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // barberView: async (_, { userId }, context) => {
    //   if (!context.user || context.user.role !== 'BARBER') {
    //     throw new AuthenticationError("Authorized for barbers only");
    //   }
    //   try {
    //     const userAppointments = await User.findById(userId).populate("appointments");
    //     if (!userAppointments) {
    //       throw new Error("User not found.");
    //     }
    //     return userAppointments.appointments;
    //   } catch (error) {
    //     throw new Error("Error while fetching appointments.");
    //   }
    // },
  },
  Mutation: {
   createUser: async (_, { userInput }) => {
      const user = await User.create(userInput);
      const token = signToken(user);
      return { token, user };
  },
    createAdminUser: async (_, { userInput, adminKey }) => {
    if (adminKey !== ADMIN_KEY) {
      throw new Error('Unauthorized: Admin key is invalid.');
    }
    const user = await User.create({ ...userInput, role: 'admin' });
    const token = signToken(user);
    return { token, user };
  },
    // Creates a message and adds to the database
    createMessage: async (_, { name, email, message }) => {

      const sentMessage = await Message.create({ name, email, message });
      return { sentMessage };

    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const isAdmin = user.role === 'admin'; 
      
      const token = signToken(user);

      return { token, user: { ...user.toObject(), isAdmin } };
    },


    //Update the signed in user's profile information
    updateUser: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in to update this profile!"); //have to uncomment this to work
      }

      const { id, user_name, email, phone, password } = args;

      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.toString() !== context.user._id.toString()) {
        throw new Error("You don't have access to update this profile"); //have to uncomment this to work
      }

      const updatedArgs = { id, user_name, email, phone, password };
      user.set(updatedArgs);

      await user.save();
      return user;
    },

    createAppointment: async (
      parent,
      { barber_name, date, time, service },
      context
    ) => {
      const { _id, user_name, email } = context.user;
      const appointment = await Appointment.create({
        barber_name,
        date,
        time,
        service,
        user: { _id, user_name, email },
      });
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
      return appointment;
    },
    // deleteAppointment: async (parent, { id }, context) => {
    //   const appointment = await Appointment.findByIdAndDelete(id);
    //   const user = await User.findByIdAndUpdate(
    //     context.user._id,
    //     { $pull: { appointments: id } },
    //     { new: true }
    //   );
    //   return user;
    // },
    deleteAppointment: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to delete an appointment");
      }
      try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
          throw new Error("Appointment not found");
        }
        if (appointment.userId !== context.user._id) {
          throw new Error("You are not authorized to delete this appointment");
        }
        await Appointment.findByIdAndDelete(id);
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { appointments: id } },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error("An error occurred while deleting the appointment");
      }
    },

    //Deletes a message, authentication check is required so that only barbers can delete the message
    deleteMessage: async (parent, { id }, context) => {
      // if (!context.user.isBarber) {
      //   throw new AuthenticationError("You don't have permission to delete messages.");
      // }
      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        throw new Error("Message not found.");
      }
      const remainingMessages = await Message.find({});
      return { messages: remainingMessages };
    },

    //update the signed in user's appointment detail
    updateAppointment: async (_, { id, barber_name, date, time, service }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in to update this appointment!");
      }
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error("User not found");
      }
      const appointment = user.appointments.id(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      appointment.barber_name = barber_name;
      appointment.date = date;
      appointment.time = time;
      appointment.service = service;
      await user.save();
      return appointment;
    },
  },
};

module.exports = resolvers;
