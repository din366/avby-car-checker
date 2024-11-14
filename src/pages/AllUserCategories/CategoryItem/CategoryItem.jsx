import styles from "./CategoryItem.module.scss";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  deleteCarLoadingWhileWaiting,
  pushingCarLoadingWhileWaiting,
  sendStartUpdatingRequest
} from "../../../store/updateCarDataSlice.js";
import {useEffect} from "react";

const CategoryItem = ({itemId, items, name, thumb, updateTime, currentUpdateProcess, loadingWhileWaitingData}) => {
  const dispatch = useDispatch();

  const getUpdate = (e) => {
    e.preventDefault();
    dispatch(pushingCarLoadingWhileWaiting(itemId));
    dispatch(sendStartUpdatingRequest(itemId));
  }

  useEffect(() => {
    if (currentUpdateProcess[itemId] === true) dispatch(deleteCarLoadingWhileWaiting(itemId));
  }, [currentUpdateProcess]);

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
            <span className={styles.carCategoryUpdate}>Последнее обновление: {updateTime}</span>
          </div>
          <button
            disabled={currentUpdateProcess[itemId] === true || loadingWhileWaitingData.find(item => item === itemId)}
            className={styles.updateButton}
            onClick={(e) => {getUpdate(e)}}>
            Обновить
          </button>
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