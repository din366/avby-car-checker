import styles from './Popup.module.scss';
import {useSelector} from "react-redux";
import {popupIsShow, popupText, popupType} from "./../../store/popupSlice.js";

const Popup = () => {
  const text = useSelector(popupText);
  const showModal = useSelector(popupIsShow);
  const type = useSelector(popupType);

  return (
    <div className={`${styles.popupWrapper} ${showModal ? styles.isShow : ''} ${type ? styles[type] : ''}`}>
      <span className={styles.popupText}>
        {text}
      </span>
    </div>
  );
};

export default Popup;