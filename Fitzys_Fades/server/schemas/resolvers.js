const { User, Appointment } = require("../models");
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
    // Get all appointments
    appointments: async () => {
      return await Appointment.find({});
    },
    // Get a single appointment by ID
    appointment: async (_, { id }) => {
      return await Appointment.findById(id);
    },
    me: async (_, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate("appointments");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (_, { userInput }) => {
      const user = await User.create(userInput);
      const token = signToken(user);
      return { token, user };
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
    updateUser: async (_, { id, user_name, email, phone, password }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update this profile!"
        );
      }
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.toString() !== context.user._id.toString()) {
        throw new AuthenticationError(
          "You don't have access to update this profile"
        );
      }
      user.user_name = user_name;
      user.email = email;
      user.phone = phone;
      user.password = password;

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

    //update the signed in user's appointment detail
    updateAppointment: async (_, { id, barber_name, date, time, service }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update this appointment!"
        );
      }
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      if (appointment.user.toString() !== context.user._id.toString()) {
        throw new AuthenticationError(
          "You don't have access to update this appointment"
        );
      }
      appointment.barber_name = barber_name;
      appointment.date = date;
      appointment.time = time;
      appointment.service = service;

      await appointment.save();

      return appointment;
    },
  },
};

module.exports = resolvers;

// Create User - DONE
// Get all User - DONE
// Get one User - DONE
// Update User - DONE?
// Create Appointment - DONE
// Get all Appointment - DONE
// Get one Appointment - DONE
// Update Appointment - DONE?
// Delete Appointment - DONE?
