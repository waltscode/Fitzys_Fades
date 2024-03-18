const typeDefs = `
  enum BarberEnum {
    JOHN_DOE
    JANE_DAWN
    WILLIAM_WILLIAMS
  }


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
    barber_name: BarberEnum!
    date: String!
    time: String!
    service: String!
  }

  input UserInput {
    user_name: String!
    email: String!
    phone: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    appointments: [Appointment]
    appointment(id: ID): Appointment
    me: User
  }



  type Mutation {
    createUser(userInput: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createAppointment(barber_name: BarberEnum!, date: String!, time: String!, service: String!): Appointment
    deleteAppointment(id: ID!): User
  }
`;

module.exports = typeDefs;