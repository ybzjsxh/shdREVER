export default {
  'POST /api/login': { code: 200, success: true },
  'GET /api/getAllDevice': {
    code: 200,
    success: true,
    data: [
      {
        ip: '1.1.1.1',
        name: 'xxx',
        mac: '1.1.1.1',
        close: true,
      },
      {
        ip: '1.1.1.2',
        name: 'xxxx',
        mac: '1.1.1.2',
        close: false,
      },
    ],
  },
  'GET /api/closeDevice': { code: 200, success: true},
  'GET /api/clearDevice': { code: 200, success: true},
  'GET /api/closeAll': { code: 200, success: true},
};
