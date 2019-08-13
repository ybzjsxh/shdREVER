import request from '@/utils/request';
import { getCloseNum } from '@/utils';

export default {
  namespace: 'device',
  state: {
    num: {
      awakeNum: 0,
      closeNum: 0,
      devNum: 0,
    },
    data: [],
  },
  reducers: {
    setDevice(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setNum(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getAllDevice(_, { call, put }) {
      let data = yield call(() =>
        request({
          method: 'GET',
          url: '/getAllDevice',
        }),
      );
      data = data.data;
      let ret = getCloseNum(data);
      yield put({ type: 'setNum', num: { ...ret, devNum: data.length} });
      yield put({ type: 'setDevice', data });
    },

    *closeDevice({ payload }, { call, put }) {
      yield call(() =>
        request({
          method: 'GET',
          url: '/closeDevice',
          params: payload
        }),
      );
    },

    *clearDevice({ payload }, { call, put }) {
      yield call(() =>
        request({
          method: 'GET',
          url: '/clearDevice',
          params: payload
        }),
      );
    },

    *closeAll(_, { call, put }) {
      yield call(() =>
        request({
          method: 'GET',
          url: '/closeAll',
        }),
      );
    },
  },
};
