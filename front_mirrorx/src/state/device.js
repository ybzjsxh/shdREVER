import mirror from 'mirrorx';

mirror.model({
  name: 'device',
  initialState: {
    awakeNum: 0,
    closeNum: 0,
    devNum: 0,
    spinning: false,
    data: []
  },
  reducers: {
    setAwakeNum(state, awakeNum) {
      return {
        ...state,
        awakeNum
      }
    },
    setCloseNum(state, closeNum) {
      return {
        ...state,
        closeNum
      }
    },
    setDevNum(state, devNum) {
      return {
        ...state,
        devNum
      }
    },
    setSpinning(state, spinning) {
      return {
        ...state,
        spinning: !state.spinning
      }
    },
    getAllDevice(state) {
      return {
        ...state
      }
    }
  },
  effects: {}
})
