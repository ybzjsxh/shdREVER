const os = require("os");
const io = require("socket.io-client");
const child_process = require("child_process");

const { svr_ip, svr_port, name, delay } = require(process.cwd() +
  "/config.json");
// console.log(ip, name, mac);
const OS_TYPE = os.platform();

// let socket = io.connect(`ws://${svr_ip}:${svr_port}`)
let socket = io(`ws://${svr_ip}:${svr_port}`, { reconnection: false });

const get_host_ip_mac = () => {
  let add = os.networkInterfaces();
  for (var devName in add) {
    // console.log(devName);
    if (/(^(无线网络|本地)连接(\s\d?)?|^WLAN|^en0|^ens|^eth0)/g.test(devName)) {
      var iface = add[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal &&
          /^\d{2,3}$/.test(alias.address.split(".")[0]) // 排除vpn
        ) {
          // console.log(alias.address, alias.mac);
          return { ip: alias.address, mac: alias.mac };
        }
      }
    }
  }
};
// get_host_ip_mac()

const shutdown = () => {
  switch (OS_TYPE) {
    case "win32":
      child_process.exec(`shutdown -s -t ${delay}`, () => {
        console.log("bye");
      });
      break;
    case "linux":
      child_process.exec(`sudo shutdown -h +${delay / 60}`, () => {
        console.log("bye");
      });
      break;
    default:
      throw new Error("不支持的系统平台");
  }
};

socket.on("connect", () => {
  console.log(`${name} connected to ${svr_ip}:${svr_port}...`);
  let { ip, mac } = get_host_ip_mac();
  // console.log(ip, mac, name);
  // register(ip, name, mac)
  let sid = socket.id;
  console.log(sid);
  socket.emit("register", {
    ip,
    name,
    mac,
    type: OS_TYPE,
    sid
  });
});

socket.on("dis", sid => {
  if (sid == socket.id) {
    socket.disconnect(true);
    shutdown();
  } else {
    console.log("not you", socket.id);
  }
});

socket.on("all", () => {
  socket.disconnect(true);
  console.log("close by closeAll");
  shutdown();
});

socket.on("disconnect", () => {
  console.log("disconnected");
  socket.emit("offline");
});
