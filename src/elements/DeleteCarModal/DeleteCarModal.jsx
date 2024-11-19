import styles from "./../AddNewCarPopup/AddNewCarModal.module.scss";
import blackCloseIcon from './../../assets/close-icon/close-icon-black.png';
import whiteCloseIcon from './../../assets/close-icon/close-icon-white.png';
import {useTheme} from "../../hooks/ThemeContext.jsx";

const DeleteCarModal = ({deleteCarModalData, setDeleteCarModalData}) => {
  const {theme} = useTheme();

  return (
    <div className={`${styles.addCarModalWrapper} ${deleteCarModalData && styles.addCarModalWrapperActive}`} onClick={() => {setDeleteCarModalData(null)}}>
      <div className={styles.addCarModalBlock} onClick={(e) => {
        e.stopPropagation()
      }}>
        <span className={styles.addCarModalTitle}>Удаление</span>
        <span
          className={styles.addCarModalText}>Вы действительно хотите удалить данные об авто "{deleteCarModalData?.name}" ?</span>

        <button className={styles.redCarModalButton} type='button'>Удалить автомобиль</button>

        <div className={styles.closeIcon}><img src={theme === 'dark' ? whiteCloseIcon : blackCloseIcon} onClick={() => {
          setDeleteCarModalData(null)
        }}/></div>
      </div>
    </div>
  );
};

export default DeleteCarModal;