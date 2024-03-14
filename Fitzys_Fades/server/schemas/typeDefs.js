const typeDefs = `
  enum BarberEnum {
    JOHN_DOE
    JANE_DAWN
    WILLIAM_WILLIAMS
  }

  enum ServiceEnum {
    FADE
    CUT
    SHAVE
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
    service: ServiceEnum!
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
    createAppointment(barber_name: BarberEnum!, date: String!, time: String!, service: ServiceEnum!): Appointment
    deleteAppointment(id: ID!): User
    updateAppointment(barber_name: BarberEnum!, date: String!, time: String!, service: ServiceEnum!): Appointment
    updateUser(user_name: String!, email: String!, phone: String!, password: String!): User
  }
`;

module.exports = typeDefs;