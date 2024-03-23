const db = require('../config/connection')
const {User, Appointment, Message} = require('../models')
const userSeeds = require('./userSeeds.json')
const appointmentSeeds = require('./appointmentSeeds.json')
const messageSeeds = require('./messageSeeds')
const fitzysFadesdb = require('./fitzysFadesdb')

db.once('open', async () => {
    try {
      await fitzysFadesdb('Appointment', 'appointments');
      await fitzysFadesdb('User', 'users');
      await fitzysFadesdb('Message', 'messages')

      await Message.create(messageSeeds);
  
      await User.create(userSeeds);
      
      for (let i = 0; i < appointmentSeeds.length; i++) {
        const randomUserIndex = Math.floor(Math.random() * userSeeds.length);
        const randomUser = userSeeds[randomUserIndex];
  
        const { _id } = await Appointment.create(appointmentSeeds[i]);
        
        const user = await User.findOneAndUpdate(
          { user_name: randomUser.user_name },
          { $addToSet: { appointments: _id } }
        );
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('All appointments have been randomly assigned to users. Messages seeded.');
    process.exit(0);
  });