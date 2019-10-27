import React from 'react';
import styles from './404.less';
import pic from '@/assets/404/404.png';
import pic_cloud from '@/assets/404/404_cloud.png';

export default () => {
  return (
    <div className={styles['wscn-http404-container']}>
      <div className={styles['wscn-http404']}>
        <div className={styles['pic-404']}>
          <img
            className={styles['pic-404__parent']}
            src={pic}
            alt="404"
          />
          <img
            className={`${styles['pic-404__child']} ${styles.left}`}
            src={pic_cloud}
            alt="404"
          />
          <img
            className={`${styles['pic-404__child']} ${styles.mid}`}
            src={pic_cloud}
            alt="404"
          />
          <img
            className={`${styles['pic-404__child']} ${styles.right}`}
            src={pic_cloud}
            alt="404"
          />
        </div>
        <div className={styles.bs}>
          <div className={styles['bs__oops']}>OOPS!</div>
          <div className={styles['bs__info']}>
            版权所有
            <a className={styles['link-type']} href="/login" target="_blank">
              fc
            </a>
          </div>
          <div className={styles['bs__headline']}>
            貌似访问了一个不存在的页面......
          </div>
          <div className={styles['bs__info']}>
            请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
          </div>
          <a href="/login" className={styles['bs__return-home']}>
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
};
