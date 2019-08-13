import chalk from 'chalk'
import devices from './models/devices';
import { net as logger } from './config/logger';
import moment from 'moment';

import io from 'socket.io-client';
let socket = io(`ws://localhost:8888`)

// 获取所有设备
export const getAllDevice = async () => {
  let data = [];
  let result = await devices.find({}, {_id: 0, __v: 0})
  for(let i of result) {
    data.push(i)
  }
  return data
}

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
      logger.info(`register device: ${ip} ${name} ${mac}`)
    }
    else {
      console.log(chalk.red(err));
    }
  })
}

// 检查是否存在
export const checkDevice = async (ip, name) => {
  // console.log(ip, name);
  let result = await devices.find({ip, name}
    , (err, doc) => {
    if(!err) console.log(chalk.green('query ok'))}
  )
  return JSON.stringify(result) === '[]' ? false : true;
}

// 关闭一台设备
export const closeDevice = async (ip, name, sid) => {
  // TODO: closeOne
  socket.emit('offline', {sid})
  let result = await devices.updateOne({ip, name},{$set: {close: true, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid: null}})
  logger.info(`close device: ${name} ${ip}`)
  return result;
}

// 关闭所有设备
export const closeAll = async () => {
  // TODO: 关闭所有客户端
  let result = await devices.updateMany({},{$set: {close: false, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid: null}},(err, doc) =>{
    if(err) {
      logger.error(err)
    }
  })
  logger.info(`closing all devices at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  return result;
}

// 清除设备
export const clearDevice = async (ip, name) => {
  let result = await devices.deleteOne({ip, name})
  logger.info(`clearing device ${ip} ${name}`)
  return result;
}

// 清除所有设备
export const clearAll = async () => {
  let result = await devices.deleteMany({},(err, doc) => {
    if(err) {
      console.log(chalk.red(err));
      logger.error(err)
    }
  })
  logger.info(`clearing all devices at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  return result;
}

// 开启一台设备
export const awakeDevice = async (ip, name, mac, sid=null) => {
  let result = await devices.updateOne({ip, name},{$set: {close: false, lastCloseTime: moment().format('YYYY-MM-DD HH:mm:ss'), sid}})
  logger.info(`awake device: ${name} ${ip} ${sid}`)
  return result;
}
// TODO 开启所有设备
