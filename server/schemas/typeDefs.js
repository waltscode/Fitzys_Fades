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
    user_name: String  # ADD THE "!" BACK IN LATER FOR PRODUCTION. DON'T FORGET! ... I FORGOT! BUT IT WORKS ANYWAYS
    email: String!
    phone: String!
    password: String!
    appointments: [Appointment]
    role: String
  }

  type Appointment {
    _id: ID!
    barber_name: BarberEnum!
    date: String!
    time: String!
    service: String!
    user: User
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
    userMostRecentAppointment(userId: ID!): Appointment
  }

  type Message {
    _id: ID!
    name: String!
    email: String!
    message: String!
  }

  type Mutation {
    createUser(userInput: UserInput!): Auth
    createAdminUser(userInput: UserInput!, adminKey: String!): Auth
    createMessage (name: String!, email: String!, message: String!): Message
    login(email: String!, password: String!): Auth
    createAppointment(barber_name: BarberEnum!, date: String!, time: String!, service: String!): Appointment
    deleteAppointment(id: ID!): Appointment
    deleteMessage(id: ID!): Message
    updateAppointment(input: UpdateAppointmentInput!): Appointment # I tihnk this needs to change from User but its in progress so put back in User if need be
    updateUser(id:ID!, user_name: String!, email: String!, phone: String!, password: String!): User
  }
`;

module.exports = typeDefs;
