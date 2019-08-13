import React from 'react';
import styles from '../index.less';

export default ({ show }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <div id={styles['owl-login']} className={ show ? styles.password : null}>
        <div className={styles.hand} />
        <div className={`${styles.hand} ${styles.handr}`} />
        <div className={styles.arms}>
          <div className={styles.arm} />
          <div className={`${styles.arm} ${styles.armr}`} />
        </div>
      </div>
    </div>
  );
};
