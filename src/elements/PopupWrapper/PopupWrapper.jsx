import styles from './PopupWrapper.module.scss';
import {useSelector} from "react-redux";
import {popupsQueue} from "./../../store/popupSlice.js";
import Popup from "./Popup/Popup.jsx";

const PopupWrapper = () => {
  const currentPopupsQueue = useSelector(popupsQueue)?.slice(0,3);
  return (
    <div className={styles.popupsWrapper}>
      {currentPopupsQueue.length ? currentPopupsQueue.map(item => <Popup
        key={item.id}
        text={item.text}
        type={item.type}
        visible={item.visible}
      />
      ) : ''}
    </div>
  )
};

export default PopupWrapper;
