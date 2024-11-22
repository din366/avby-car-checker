import styles from "./Popup.module.scss";

const Popup = ({text, type = null, visible}) => {
  return (
    <div className={`${styles.popupWrapper} ${visible ? styles.isShow : ''} ${type ? styles[type] : ''}`}>
      <span className={styles.popupText}>
      {text}
      </span>
    </div>
  );
};

export default Popup;