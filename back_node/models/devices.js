const db = require("../config/db");

let Schema = db.Schema;

let devicesSchema = new Schema(
  {
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
    type: {
      type: String,
      require: true
    },
    close: Boolean,
    createTime: Date,
    awakeTime: Date,
    lastCloseTime: Date,
    sid: {
      type: String
      // require: true
    }
  },
  { collection: "devices" }
);
let devices = db.model("devices", devicesSchema);

export default devices;
