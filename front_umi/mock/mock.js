export default {
  'POST /api/login': { code: 200, success: true },
  'GET /api/getAllDevice': {
    code: 200,
    success: true,
    data: [
      {
        ip: '192.168.100.100',
        name: 'xxx',
        mac: '00:00:00:11:22:33',
        type: 'win32',
        close: true,
      },
      {
        ip: '192.168.100.101',
        name: 'xxxx',
        type: 'linux',
        mac: '00:00:00:11:22:33',
        close: false,
      },
    ],
  },
  'GET /api/closeDevice': { code: 503, success: false },
  'GET /api/clearDevice': { code: 200, success: true },
  'GET /api/closeAll': { code: 200, success: true },
};
