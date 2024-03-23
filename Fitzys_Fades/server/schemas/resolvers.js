const { User, Appointment, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/Auth");

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

    //I think get all appointments will need an added authentication check so only barbers can see all the appointments
    // Get all appointments
    appointments: async () => {
      return await Appointment.find({});
    },
    // Get a single appointment by ID
    appointment: async (_, { id }) => {
      return await Appointment.findById(id);
    },
    //  Get all messages
    messages: async (_,__,context) => {
      //I think I will need John M's help with implementing barber authentication check here. Currently placeholder)
      // if (!context.user.isBarber){
      //   throw new AuthenticationError("You don't not have permission to view messages")
      // }
      return await Message.find({});
    },
    // Get a single message by ID
    message: async (_, { id }, context) => {
      //I think I will need John M's help with implementing barber authentication check here. Currently placeholder)
      if (!context.user.isBarber){
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
    // Creates a message and adds to the database
    createMessage: async (_, {name, email, message}) => {
      const sentMessage = await Message.create({name, email, message})
      return {sentMessage}
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
      const token = signToken(user);
      return { token, user };
    },

    //Update the signed in user's profile information
    updateUser: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in to update this profile!"); //have to uncomment this to work
      }
      const { id, user_name, email, phone, password} = args
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.toString() !== context.user._id.toString()) {
        throw new Error("You don't have access to update this profile"); //have to uncomment this to work
      }
      const updatedArgs = { id, user_name, email, phone, password}
      user.set(updatedArgs)
      await user.save();
      return user;
    },

    createAppointment: async (
      parent,
{ barber_name, date, time, service },
      context
    ) => {
      const appointment = await Appointment.create({
        barber_name,
        date,
        time,
        service,
      });
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
      return appointment;
    },
    deleteAppointment: async (parent, { id }, context) => {
      const appointment = await Appointment.findByIdAndDelete(id);
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { appointments: id } },
        { new: true }
      );
      return user;
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
    updateAppointment: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in to update this appointment!"); // have to uncomment this to work
      }
      const { barber_name, date, time, service } = args;
      const appointment = await Appointment.findById(args.id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      if (appointment.user.toString() !== context.user._id.toString()) {
        throw new Error("You don't have access to update this appointment"); //have to uncomment this to work
      }
      const updatedArgs = { barber_name, date, time, service };
      appointment.set(updatedArgs);
      await appointment.save();
      return appointment;
    },
  },
};

module.exports = resolvers;
