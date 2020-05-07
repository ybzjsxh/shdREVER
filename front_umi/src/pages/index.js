import styles from './index.css';
import Redirect from 'umi/redirect';

export default function() {
  if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
  return <Redirect to="/login" className={styles.normal} />;
}
