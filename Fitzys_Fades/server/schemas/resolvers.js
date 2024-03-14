const { User, Appointment } = require("../models");

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
  },
  Mutation: {
    createUser: async (_, { userInput }) => {
      const newUser = new User(userInput);
      return newUser.save();
    },
    createUser: async (parent, { user_name, email, phone, password}) =>{
        return await User.create({user_name,email, phone, password})
    },
    createAppointment: async (parent, { barber_name, date, time, service}) => {
        return await Appointment.create({barber_name,date,time,service})
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
