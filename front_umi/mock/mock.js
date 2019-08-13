export default {
  'POST /login': { code: 200, success: true },
  'GET /getAllDevice': {
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
  'GET /closeDevice': { code: 200, success: true},
  'GET /clearDevice': { code: 200, success: true},
  'GET /closeAll': { code: 200, success: true},
};
