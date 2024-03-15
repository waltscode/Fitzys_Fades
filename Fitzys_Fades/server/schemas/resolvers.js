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
