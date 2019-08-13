import Mock, { Random } from 'mockjs'

Mock.setup({timeout: '1200-1600'});

Mock.mock('/login', 'post', {
    code: 200,
    msg: "logined"
});

let s1, mac;
s1 = Random.string('upper', 6)+Random.string('number', 6);
mac = s1.replace(/(..)/g, '$1:');

Mock.mock('/getAllDevice', [
    {
      'ip': Random.ip(),
      'name': Random.name(),
      'mac': mac,
      'close': 1
    },
    {
      'ip': Random.ip(),
      'name': Random.name(),
      'mac': mac,
      'close': 0
    },
    {
      'ip': Random.ip(),
      'name': Random.name(),
      'mac': mac,
      'close': 1
    },
  ]
);

Mock.mock('/closeAll', {
  'code': 200
});

Mock.mock('/closeDevice', {
  'code': 200
});

Mock.mock('/wakeDevice', {
  'code': 200
});
