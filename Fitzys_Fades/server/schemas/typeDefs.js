const typeDefs = `
    type User {
        _id: ID!
        user_name: String!
        email: String!
        phone: String!
        password: String!
        appointments: [Appointment]
    }

    type Appointment {
        _id: ID!
        barber_name: String!
        user_name: String!
        date: String!
        time: String!
        service: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        appointments: [Appointment]
        appointment(id: ID): Appointment
    }

    type Mutation {
        // Create User
        // Get all User
        // Get one User
        // Update User
        // Create Appointment
        // Get all Appointment
        // Get one Appointment
        // Update Appointment
        // Delete Appointment
    }
`;

module.exports = typeDefs;