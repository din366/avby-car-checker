import styles from "./../AddNewCarPopup/AddNewCarModal.module.scss";
import blackCloseIcon from './../../assets/close-icon/close-icon-black.png';
import whiteCloseIcon from './../../assets/close-icon/close-icon-white.png';
import {useTheme} from "../../hooks/ThemeContext.jsx";
import {useDispatch} from "react-redux";
import {deleteCar} from "../../store/deleteCarSlice.js";
import {getPopup} from "../../store/popupSlice.js";

const DeleteCarModal = ({deleteCarModalData, setDeleteCarModalData}) => {
  const {theme} = useTheme();
  const dispatch = useDispatch();

  const startDeleteCar = () => {
    if (deleteCarModalData.itemId) {
      dispatch(deleteCar(deleteCarModalData.itemId));
      setDeleteCarModalData(null);
    } else {
      setDeleteCarModalData(null);
      dispatch(getPopup({text: `Ошибка при удалении ${deleteCarModalData.name}`, delay: 3000, type: 'alert'}))
    }

  }

  return (
    <div className={`${styles.addCarModalWrapper} ${deleteCarModalData && styles.addCarModalWrapperActive}`} onClick={() => {setDeleteCarModalData(null)}}>
      <div className={styles.addCarModalBlock} onClick={(e) => {
        e.stopPropagation()
      }}>
        <span className={styles.addCarModalTitle}>Удаление</span>
        <span
          className={styles.addCarModalText}>Вы действительно хотите удалить данные об авто "{deleteCarModalData?.name}" ?</span>

        <button className={styles.redCarModalButton} type='button' onClick={startDeleteCar}>Удалить автомобиль</button>

        <div className={styles.closeIcon}><img src={theme === 'dark' ? whiteCloseIcon : blackCloseIcon} onClick={() => {
          setDeleteCarModalData(null)
        }}/></div>
      </div>
    </div>
  );
};

export default DeleteCarModal;