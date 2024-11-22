import styles from "./CategoryItem.module.scss";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  pushingCarLoadingWhileWaiting,
  sendStartUpdatingRequest
} from "../../../store/updateCarDataSlice.js";
import ProgressBarComponent from "./ProgressBar/ProgressBarComponent.jsx";
import trashIconBlack from './../../../assets/trash-icon/trash-icon-black.png';
import trashIconWhite from './../../../assets/trash-icon/trash-icon-white.png';
import trashIconActive from './../../../assets/trash-icon/trash-icon-active.png';
import carIconPlaceholder from './../../../assets/carPlaceholder.png';
import {useTheme} from "../../../hooks/ThemeContext.jsx";

const CategoryItem = ({itemId, items, name, thumb, updateTime, currentUpdateProcess, loadingWhileWaitingData, setDeleteCarModalData}) => {
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const getUpdate = (e) => {
    e.preventDefault();
    dispatch(pushingCarLoadingWhileWaiting(itemId));
    dispatch(sendStartUpdatingRequest({carId: itemId, carName: name}));
  }

  const clickTrashButton = (e) => {
    e.preventDefault();
    setDeleteCarModalData({itemId, name});
  }

  return (
    <div>
      <Link to={`/categories/${itemId}`}>
        <div className={styles.carCategory}>
          <div className={styles.carCategoryImageWrapper}>

            <img className={styles.carCategoryImage} src={thumb || carIconPlaceholder} alt=""/>
          </div>
          <div className={styles.carCategoryText}>
            <span className={styles.carCategoryTitle}>{name ? `Авто: ${name}` : 'Загрузка данных об авто'}</span>
            {items ? <span className={styles.carCategoryCarCount}>Сейчас в продаже: {items} шт</span> : ''}
            {updateTime ? <span className={styles.carCategoryUpdate}>Обновлено: {updateTime}</span> : ''}
          </div>
          {itemId ? <>
            <button
              disabled={currentUpdateProcess[itemId]?.status === true || loadingWhileWaitingData.find(item => item === itemId)}
              className={styles.updateButton}
              onClick={(e) => {
                getUpdate(e)
              }}>
              Обновить
            </button>

            <ProgressBarComponent itemId={itemId} currentUpdateProcess={currentUpdateProcess}/>

            <div className={styles.deleteCarIcon} onClick={clickTrashButton}>
              <img className={styles.deleteIcon} src={theme === 'dark' ? trashIconWhite : trashIconBlack}/>
              <img className={styles.deleteIconActive} src={trashIconActive} alt=""/>
            </div>

          </> : ''}


          <div
            className={`${styles.spinnerWrapper} ${(currentUpdateProcess[itemId]?.status === true || loadingWhileWaitingData.find(item => item === itemId)) ? styles.spinnerWrapperActive : ''}`}>
            <div className="loader"></div>
          </div>


        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;