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
    service: String!
  }

  input UpdateAppointmentInput {
    userId: ID!
    appointmentId: ID!
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
    messages: [Message]
    message(id: ID!): Message
  }

  type Message {
    _id: ID!
    name: String!
    email: String!
    message: String!
  }

  type Mutation {
    createUser(userInput: UserInput!): Auth
    createMessage (name: String!, email: String!, message: String!): Message
    login(email: String!, password: String!): Auth
    createAppointment(barber_name: BarberEnum!, date: String!, time: String!, service: String!): Appointment
    deleteAppointment(id: ID!): User
    deleteMessage(id: ID!): Message
    updateAppointment(input: UpdateAppointmentInput!): Appointment
    updateUser(id:ID!, user_name: String!, email: String!, phone: String!, password: String!): User
  }
`;

module.exports = typeDefs;
