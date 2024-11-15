import styles from "./CategoryItem.module.scss";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  pushingCarLoadingWhileWaiting,
  sendStartUpdatingRequest
} from "../../../store/updateCarDataSlice.js";
import ProgressBarComponent from "./ProgressBar/ProgressBarComponent.jsx";


const CategoryItem = ({itemId, items, name, thumb, updateTime, currentUpdateProcess, loadingWhileWaitingData}) => {
  const dispatch = useDispatch();

  const getUpdate = (e) => {
    e.preventDefault();
    dispatch(pushingCarLoadingWhileWaiting(itemId));
    dispatch(sendStartUpdatingRequest({carId: itemId, carName: name}));
  }

  return (
    <div>
      <Link to={`/categories/${itemId}`}>
        <div className={styles.carCategory}>
          <div className={styles.carCategoryImageWrapper}>
            <img className={styles.carCategoryImage} src={thumb} alt=""/>
          </div>
          <div className={styles.carCategoryText}>
            <span className={styles.carCategoryTitle}>Авто: {name}</span>
            <span className={styles.carCategoryCarCount}>Сейчас в продаже: {items} шт</span>
            <span className={styles.carCategoryUpdate}>Обновлено: {updateTime}</span>
          </div>
          <button
            disabled={currentUpdateProcess[itemId] === true || loadingWhileWaitingData.find(item => item === itemId)}
            className={styles.updateButton}
            onClick={(e) => {
              getUpdate(e)
            }}>
            Обновить
          </button>
          <ProgressBarComponent itemId={itemId} currentUpdateProcess={currentUpdateProcess}/>

          <div
            className={`${styles.spinnerWrapper} ${(currentUpdateProcess[itemId] === true || loadingWhileWaitingData.find(item => item === itemId)) ? styles.spinnerWrapperActive : ''}`}>
            <div className="loader"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;