import Mock, { Random } from 'mockjs'

Mock.setup({timeout: '1200-1600'});

Mock.mock('/login', 'post', {
    code: 200,
    msg: "logined"
})

Mock.mock('/getAllDevice', [
    {
      'ip': Random.ip(),
      'name': Random.name()
    },
    {
      'ip': Random.ip(),
      'name': Random.name()
    },
    {
      'ip': Random.ip(),
      'name': Random.name()
    },
  ]
)

Mock.mock('/closeAll', {
  'code': 200
})

Mock.mock('/closeDevice', {
  'code': 200
})