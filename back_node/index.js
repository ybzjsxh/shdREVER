require('babel-register');
require('babel-polyfill');
const Koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const path = require('path');
const chalk = require('chalk');
const koabody = require('koa-body');

const routes = require('./router')
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const controller = require('./controller')
const axios = require('axios')


const port = process.env.port || 8888;

app.use(koabody())

app.use(serve(path.resolve(__dirname, 'build')))
router.post('/login', routes.login)
  // .get('/register', routes.register)
  .get('/getAllDevice', routes.getAllDevice)
  .get('/closeDevice', routes.closeDevice)
  .get('/closeAll', routes.closeAll)
  .get('/clearDevice', routes.clearDevice)
  .get('/clearAll', routes.clearAll)
  .get('/awakeDevice', routes.awakeDevice)

app.use(router.routes());


let onlineDevice = {}

io.on('connection', socket => {
  console.log(socket.id);
  socket.emit('print', {
    id: socket.id
  })
  socket.on('register', async data => {
    let { ip, name, mac } = data;
    let check = await controller.checkDevice(ip, name)
    console.log('onlineDevice: ', onlineDevice);
    if ( check ) {
      console.log(`already exist, awaking now, new sid: ${socket.id}`);
      onlineDevice[name] = socket.id
      console.log('onlineDevice: ', onlineDevice);
      controller.awakeDevice(ip, name, mac, socket.id)
    } else {
      console.log(`register device ${data.name}`);
      onlineDevice[name] = socket.id
      console.log('onlineDevice: ', onlineDevice);
      controller.register(ip, name, mac, socket.id)
    }
  })
  // socket.on('getAllDevice', async () => {
  //   let sockets = []
  //   console.log('ggggg', socket.client.id);
  //   // console.log(io.sockets.connected);
  //   for (i in io.sockets.connected) {
  //     sockets.push(i)
  //   }
  //   console.log('sssss', sockets);
  //   let result = await controller.getAllDevice()
  //   console.log('dd '+socket.id);
  //   let newRet = result.map(i=>i.sid).filter(v=>{
  //     console.log('vvvvv'+v);
  //     return v !== socket.id
  //   })
  //   console.log(newRet);
  //   // console.log(socket.client.request);
  //   io.emit('allDevice', {
  //     // id: socket.client.id
  //     data: newRet
  //   })
  //   // io.emit('alld', {
  //   //   id: socket.client.id
  //   // })
  // })
  socket.on('offline', data => {
    console.log('off ', data);
    io.emit('dis')
    socket.disconnect()
  })
  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`)
    console.log(`delete ${socket.id} ${onlineDevice.name}`)
    delete onlineDevice.name
    io.emit('dis')
  })
})

// io.on('disconnect', socket => {
//   console.log('disconnect socket', socket);
// })

server.listen(port, ()=>{
  console.log(chalk.blue(`listening on port ${chalk.yellowBright(port)}`));
})
