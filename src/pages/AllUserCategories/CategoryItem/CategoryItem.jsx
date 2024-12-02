import styles from "./CategoryItem.module.scss";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentQueue, sendStartUpdatingRequest} from "../../../store/updateCarDataSlice.js";
import ProgressBarComponent from "./ProgressBar/ProgressBarComponent.jsx";
import trashIconBlack from './../../../assets/trash-icon/trash-icon-black.png';
import trashIconWhite from './../../../assets/trash-icon/trash-icon-white.png';
import trashIconActive from './../../../assets/trash-icon/trash-icon-active.png';
import carIconPlaceholder from './../../../assets/carPlaceholder.png';
import {useTheme} from "../../../hooks/ThemeContext.jsx";

const CategoryItem = ({itemId, items, name, thumb, updateTime, currentUpdateProcess, setDeleteCarModalData}) => {
  const dispatch = useDispatch();
  const currentUserQueue = useSelector(currentQueue)
  const {theme} = useTheme();
  const getUpdate = (e) => {
    e.preventDefault();
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
            <img className={`${styles.carCategoryImage} ${!thumb ? styles.carCategoryImageThumb : ''}`} src={thumb || carIconPlaceholder} alt=""/>
          </div>
          <div className={styles.carCategoryText}>
            <span className={styles.carCategoryTitle}>{name ? `Авто: ${name}` : 'Загрузка данных об авто'}</span>
            {items ? <span className={styles.carCategoryCarCount}>Сейчас в продаже: {items} шт</span> : ''}
            {updateTime ? <span className={styles.carCategoryUpdate}>Обновлено: {updateTime}</span> : ''}
          </div>
          {itemId ? <>
            <button
              disabled={currentUpdateProcess?.carId === itemId || currentUserQueue?.find(item => item === itemId)}
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
            className={`${styles.spinnerWrapper} ${(currentUpdateProcess?.carId === itemId || currentUserQueue.find(item => item === itemId)) ? styles.spinnerWrapperActive : ''}`}>
            <div className="loader"></div>
          </div>


        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;