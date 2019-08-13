const db = require('../config/db');

let Schema = db.Schema;

let devicesSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  ip: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  mac: {
    type: String,
    require: true
  },
  close: Boolean,
  createTime: String,
  lastCloseTime: String,
  sid: {
    type: String,
    // require: true
  }
}, {collection: 'devices'})
let devices = db.model('devices', devicesSchema)

export default devices;
