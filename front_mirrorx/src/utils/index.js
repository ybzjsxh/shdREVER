export const getCloseNum = data => {
  let closeNum = 0;
  let awakeNum = 0;
  for (let i of data) {
    i.close ?
      closeNum += 1 :
      awakeNum += 1
  }
  return {
    closeNum,
    awakeNum
  }
}

// export const setCookie = (key, value) => {
//   const d = new Date();
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
//   const expires = "expires=" + d.toGMTString();
//   document.cookie = key + "=" + value + "; " + expires;
// }
