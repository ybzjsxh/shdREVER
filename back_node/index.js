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

const port = process.env.port || 8888;

app.use(koabody())

app.use(serve(path.resolve(__dirname, 'dist')))
router.post('/login', routes.login)
  // .get('/register', routes.register)
  .get('/getAllDevice', routes.getAllDevice)
  .get('/closeDevice', routes.closeDevice)
  .get('/closeAll', routes.closeAll)
  .get('/clearDevice', routes.clearDevice)
  .get('/clearAll', routes.clearAll)
  .get('/awakeDevice', routes.awakeDevice)

app.use(router.routes());

io.on('connection', socket => {
  socket.join(socket.id);
  console.log(io.sockets.adapter.rooms);
  socket.on('register', async data => {
    let { ip, name, mac } = data;
    let check = await controller.checkDevice(ip, name)
    if ( check ) {
      console.log(`already exist, awaking now, new sid: ${socket.id}`);
      controller.awakeDevice(ip, name, mac, socket.id)
    } else {
      console.log(`register device ${data.name}`);
      controller.register(ip, name, mac, socket.id)
    }
  })

  socket.on('offline', sid => {
    socket.broadcast.to(sid).emit('dis', sid)
    socket.leave(sid)
  })

  socket.on('disconnect', () => {
    console.log(chalk.yellow(`client ${socket.id} disconnected`));
  })
})

io.on('disconnect', socket => {
  console.log(chalk.yellow(`disconnect socket ${socket}`));
})

server.listen(port, ()=>{
  console.log(chalk.blue(`listening on port ${chalk.yellowBright(port)}`));
})
