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
    me : async (_, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate("appointments");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
    barberView: async (_, { userId }, context) => {
       if (!context.user || context.user.role !== 'BARBER') {
    throw new AuthenticationError("Authorized for barbers only");
  }

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
    createAppointment: async (parent, { barber_name, date, time, service}, context) => {
      const appointment = await Appointment.create({barber_name,date,time,service})
      const user = await User.findByIdAndUpdate(context.user._id,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
      return appointment;
    },
    deleteAppointment: async (parent, { id }, context) => {
      const appointment = await Appointment.findByIdAndDelete(id);
      const user = await User.findByIdAndUpdate(context.user._id,
        { $pull: { appointments: id } },
        { new: true }
      );
      return user;
    }
  },
};

module.exports = resolvers;

// Create User - DONE
// Get all User - DONE
// Get one User - DONE
// Update User
// Create Appointment - DONE
// Get all Appointment - DONE
// Get one Appointment - DONE
// Update Appointment
// Delete Appointment
