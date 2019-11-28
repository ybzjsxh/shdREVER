const path = require("path");
const log4js = require("log4js");

log4js.configure({
  appenders: {
    net: {
      type: "dateFile",
      pattern: "yyMMdd",
      filename: path.join(__dirname, "../logs/net/", "net.log"),
      keepFileExt: true,
      daysToKeep: 7
    },
    out: {
      type: "dateFile",
      pattern: "yyMMdd",
      filename: path.join(__dirname, "../logs/out/", "out.log"),
      keepFileExt: true,
      daysToKeep: 7
    }
  },
  categories: {
    default: { appenders: ["out"], level: "info" },
    net: { appenders: ["net"], level: "info" }
  }
});

export const net = log4js.getLogger("net");
