const mongoose = require('mongoose');

// const DB_URL = 'mongodb://192.168.204.145:27017/devices'
const DB_URL = 'mongodb://47.98.142.156:27777/devices'
mongoose.connect(DB_URL, {useNewUrlParser: true})
mongoose.connection.on('connected', ()=>{
  console.log(`connected to ${DB_URL}`);
})

module.exports = mongoose;
