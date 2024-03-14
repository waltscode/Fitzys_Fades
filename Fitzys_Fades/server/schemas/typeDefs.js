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
    date: Date!
    time: Date!
    service: ServiceEnum!
  }

  input UserInput {
    user_name: String!
    email: String!
    phone: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    appointments: [Appointment]
    appointment(id: ID): Appointment
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    createUser(user_name: String!, email: String!, phone: String!, password: String!)
    createAppointment(barber_name: BarberEnum!, date: Date!, time: Date!, service: ServiceEnum!): Appointment
  }
`;

module.exports = typeDefs;