import router from 'umi/router';
import request from '@/utils/request';
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {
    logined: false,
  },
  reducers: {
    signin(state, payload) {
      return {
        ...state,
        logined: true,
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      let data = yield call(() =>
        request({
          method: 'POST',
          url: '/login',
          params: payload,
        }),
      );
      if (data) {
        yield put({ type: 'signin' });
        message.success('登陆成功');
        router.push('/main');
      }
    },
  },
};
