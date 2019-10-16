// const crypto = require('crypto');
const chalk = require('chalk');
const controller = require('../controller');

// 登录
export const login = async (ctx, next) => {
  // let me = 'a6ec51f044f37104dbef3a539673b78f'
  let me = ctx.request.body.pass;
  if (me) {
    // let md5 = crypto.createHash('md5');
    // let ret = md5.update(me).digest('hex');
    if (me === 'a6ec51f044f37104dbef3a539673b78f') {
      ctx.cookies.set('pass', me, {
        domain: 'localhost',
        path: '/',
        maxAge: 24 * 60 * 60,
        httpOnly: false,
        // expires: new Date('2019-05-11')
      });
      return (ctx.response.body = { code: 200, msg: 'logined' });
    }
    ctx.response.body = { code: 503, msg: '密码不正确！' };
  }
};

// 注册设备
// export const register = async (ctx, next) => {
//   const { name, ip, mac } = ctx.request.query;
//   console.log("router: ", name, ip, mac);
//   let result = await controller.checkDevice(ip, name);
//   if (result) {
//     let awake = await controller.awakeDevice(ip, name, mac)
//     return ctx.response.body = {code: 500, msg: 'device already exist!'}
//   }
//   await controller.register(ip, name, mac)
//   return ctx.response.body = {code: 200, msg: `register ok`}
// }

// 获取所有设备
export const getAllDevice = async (ctx, next) => {
  let data = await controller.getAllDevice();
  // console.log(data);
  return (ctx.response.body = { code: 200, msg: 'ok', data });
};

// 关闭一台设备
export const closeDevice = async (ctx, next) => {
  const { ip, name, mac, sid } = ctx.request.query;
  if (!!ip && !!name) {
    console.log(chalk.red(`closing device ${name} ${ip} ${sid}`));
    let result = await controller.closeDevice(ip, name, sid);
    if (result) {
      return (ctx.response.body = { code: 200, msg: 'ok' });
    }
  }
  return (ctx.response.body = { code: 500, msg: 'missing params' });
};

// 关闭所有设备
export const closeAll = async (ctx, next) => {
  let result = await controller.closeAll();
  return (ctx.response.body = { code: 200, msg: 'ok' });
};

// 清除一台设备
export const clearDevice = async (ctx, next) => {
  const { ip, name } = ctx.request.query;
  if (ip && name) {
    let result = await controller.clearDevice(ip, name);
    return (ctx.response.body = { code: 200, msg: 'ok' });
  }
  return (ctx.response.body = { code: 500, msg: 'missing params' });
};

// 清除所有设备
export const clearAll = async (ctx, next) => {
  let result = await controller.clearAll();
  return (ctx.response.body = { code: 200, msg: 'ok' });
};

// 开启一台设备
export const awakeDevice = async (ctx, next) => {
  const { ip, name, mac } = ctx.request.query;
  let result = await controller.awakeDevice(ip, name, mac);
  return (ctx.response.body = { code: 200, msg: 'ok' });
};

// 开启所有设备
export const awakeAll = async (ctx, next) => {
  let getAllDevice = await controller.getAllDevice();
  let getCloseDevice = getAllDevice.filter(i => i.close).forEach(i => controller.awakeDevice(i.ip, i.name, i.mac));
  return (ctx.response.body = { code: 200, msg: 'ok' });
};
