const os = require('os');
const io = require('socket.io-client');
const child_process = require('child_process');

const { svr_ip, svr_port, name, command } = require(process.cwd() + '/config.json');
// console.log(ip, name, mac);

// let socket = io.connect(`ws://${svr_ip}:${svr_port}`)
let socket = io(`ws://${svr_ip}:${svr_port}`, { reconnection: false });

const get_host_ip_mac = () => {
  let add = os.networkInterfaces();
  for (var devName in add) {
    // console.log(devName);
    if (devName === '本地连接' || devName === 'WLAN' || devName === 'en0' || devName === 'ens') {
      var iface = add[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          // console.log(alias.address, alias.mac);
          return { ip: alias.address, mac: alias.mac };
        }
      }
    }
  }
};
// get_host_ip_mac()

const register = async (ip, name, mac) => {
  socket.emit('online', {
    ip,
    name,
    mac,
  });
};

socket.on('connect', () => {
  console.log(`${name} connected to ${svr_ip}:${svr_port}...`);
  let { ip, mac } = get_host_ip_mac();
  // console.log(ip, mac, name);
  // register(ip, name, mac)
  let sid = socket.id;
  console.log(sid);
  socket.emit('register', {
    ip,
    name,
    mac,
    sid,
  });
});

socket.on('dis', sid => {
  if (sid == socket.id) {
    socket.disconnect(true);
    name.toLowerCase().indexOf('win') > -1
      ? child_process.exec(command.windows, () => {
          console.log('bye');
        })
      : child_process.exec(command.linux, () => {
          console.log('bye');
        });
  } else {
    console.log('not you', socket.id);
  }
});

socket.on('all', () => {
  socket.disconnect(true);
  console.log('close by closeAll');
  name.toLowerCase().includes('win')
    ? child_process.exec(command.windows, () => {
        console.log('bye');
      })
    : child_process.exec(command.linux, () => {
        console.log('bye');
      });
});

socket.on('disconnect', () => {
  console.log('disconnected');
  socket.emit('offline');
});
