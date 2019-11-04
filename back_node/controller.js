import chalk from 'chalk';
import devices from './models/devices';
import { net as logger } from './config/logger';
import moment from 'moment';
import wol from 'wake_on_lan';

import io from 'socket.io-client';
let socket = io(`ws://localhost:8888`, { reconnection: false });

// 获取所有设备
export const getAllDevice = async () => {
  let data = [];
  let result = await devices.find({}, { _id: 0, __v: 0 });
  for (let i of result) {
    data.push(i);
  }
  return data;
};

// 注册设备
export const register = async (ip, name, mac, sid) => {
  let newDevice = new devices();
  newDevice.ip = ip;
  newDevice.name = name;
  newDevice.mac = mac;
  newDevice.close = false;
  newDevice.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
  newDevice.lastCloseTime = null;
  newDevice.sid = sid;
  let result = await newDevice.save((err, doc) => {
    if (!err) {
      console.log(chalk.yellowBright(`register device: ${ip} ${name} ${mac}`));
      logger.info(`register device: ${ip} ${name} ${mac}`);
    } else {
      console.log(chalk.red(err));
    }
  });
};

// 检查是否存在
export const checkDevice = async (ip, name, mac) => {
  // console.log(ip, name);
  let result = await devices.find({ ip, name, mac }, (err, doc) => {
    if (!err) console.log(chalk.green('query ok'));
  });
  return JSON.stringify(result) === '[]' ? false : true;
};

// 关闭一台设备
export const closeDevice = async (ip, name, sid) => {
  socket.emit('offline', sid);
  let result = await devices.updateOne(
    { ip, name },
    { $set: { close: true, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid: null } }
  );
  logger.info(`close device: ${name} ${ip}`);
  return result;
};

// 关闭所有设备
export const closeAll = async () => {
  socket.emit('closeAll');
  let result = await devices.updateMany(
    {},
    { $set: { close: true, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid: null } },
    (err, doc) => {
      if (err) {
        logger.error(err);
      }
    }
  );
  logger.info(`closing all devices at ${moment().format('YYMMDD HH:mm:ss')}`);
  return result;
};

// 清除设备
export const clearDevice = async (ip, name) => {
  let result = await devices.deleteOne({ ip, name });
  logger.info(`clearing device ${ip} ${name}`);
  return result;
};

// 清除所有设备
export const clearAll = async () => {
  let result = await devices.deleteMany({}, (err, doc) => {
    if (err) {
      console.log(chalk.red(err));
      logger.error(err);
    }
  });
  logger.info(`clearing all devices at ${moment().format('YYMMDD HH:mm:ss')}`);
  return result;
};

// 开启一台设备
export const awakeDevice = async (ip, name, mac, sid = null) => {
  let result = await devices.updateOne(
    { ip, name },
    { $set: { close: false, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid } }
  );
  wol.wake(mac, err => {
    if (err) {
      logger.error(err)
      return Promise.reject();
    } else {
      console.log(`send wol to ${mac}`);
      logger.info(`awake device: ${name} ${ip} ${sid} at ${moment().format('YYMMDD HH:mm:ss')}`);
    }
  })
  return result;
};
