const config = require('./config');
const os = require('os')
const io = require('socket.io-client')
const axios = require('axios');

const {svr_ip, svr_port, name} = config;
// console.log(ip, name, mac);

// let socket = io.connect(`ws://${svr_ip}:${svr_port}`)
let socket = io(`ws://${svr_ip}:${svr_port}`)

const get_host_ip_mac = () => {
  let add = os.networkInterfaces();
  for (var devName in add) {
    // console.log(devName);
    if(devName==='WLAN' || devName==='en0') {
      var iface = add[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          // console.log(alias.address, alias.mac);
          return {ip: alias.address, mac: alias.mac}
        }
      }
    }
  }
}
// get_host_ip_mac()

const register = async (ip, name, mac) => {
  socket.emit('online', {
    ip, name, mac
  })
}

socket.on('connect', () => {
  console.log('connected, check registration...');
  let { ip, mac } = get_host_ip_mac()
  // console.log(ip, mac, name);
  // register(ip, name, mac)
  let sid = socket.id
  // console.log(sid);
  socket.emit('register', {
    ip, name, mac, sid
  })
})

socket.on('print', data => {
  console.log(`socket id is ${data.id}`);
})

// socket.on('allDevice', data => {
//   console.log(data);
// })
socket.on('offline', data => {
  console.log('close', socket);
  // console.log('close', data);
  socket.disconnect()
})
socket.on('dis', () => {
  console.log('process', process);
  socket.disconnect()
})
