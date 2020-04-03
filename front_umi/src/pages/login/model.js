import router from 'umi/router';
import request from '@/utils/request';
import { message } from 'antd';
import md5 from 'md5';

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
      if (data.code === 200) {
        yield put({ type: 'signin' });
        sessionStorage.setItem('shutdownToken', md5(new Date().getTime()));
        message.success('登陆成功');
        router.push('/main');
      } else {
        message.error(data.msg);
      }
    },
  },
};
