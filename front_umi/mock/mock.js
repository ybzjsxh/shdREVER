export default {
  'POST /api/login': { code: 200, success: true },
  'GET /api/getAllDevice': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: 200,
          success: true,
          data: [
            {
              ip: '192.168.100.100',
              name: '哈哈哈哈哈哈哈',
              mac: '00:00:00:11:22:33',
              lastCloseTime: '2020-03-04T04:46:47.000Z',
              type: 'win32',
              close: true,
            },
            {
              ip: '192.168.100.101',
              name: '哈哈哈哈哈哈哈',
              type: 'linux',
              lastCloseTime: '2020-03-04T04:46:47.000Z',
              mac: '00:00:00:11:22:33',
              close: false,
            },
          ],
        }),
      1000,
    );
  },
  'GET /api/closeDevice': { code: 503, success: false },
  'GET /api/clearDevice': { code: 200, success: true },
  'GET /api/closeAll': { code: 200, success: true },
};
