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
import DynamicsPriceDataBlock from "./DynamicsPriceDataBlock/DynamicsPriceDataBlock.jsx";

const CategoryItem = ({itemId, items, name, thumb, updateTime, currentUpdateProcess, setDeleteCarModalData, dynamicsData}) => {
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
            {dynamicsData ?
              <div className={styles.carsDynamicsShortData}>
                <div className={styles.shortData}>
                  <div className={styles.carsDynamicsPrices}>
                    {dynamicsData?.minPriceDynamics ? <DynamicsPriceDataBlock prices={dynamicsData.minPriceDynamics} placeholder={'Min'}/> : ''}
                    {dynamicsData?.middlePriceDynamics ? <DynamicsPriceDataBlock prices={dynamicsData.middlePriceDynamics} placeholder={'Mid'}/> : ''}
                    {dynamicsData?.maxPriceDynamics ? <DynamicsPriceDataBlock prices={dynamicsData.maxPriceDynamics} placeholder={'Max'}/> : ''}
                  </div>
                </div>
              </div>
              : ''
            }
            <div className={styles.carsDynamicsInfo}>
              {items ? <span>В продаже: {items}</span> : ''}
              {dynamicsData?.newCarsCount ? <span>Новых: {dynamicsData.newCarsCount}</span> : ''}
              {dynamicsData?.soldCarsCount ? <span>Закрытых: {dynamicsData.soldCarsCount}</span> : ''}
            </div>
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

            <div className={`${styles.deleteCarIcon} ${currentUpdateProcess?.carId === itemId || currentUserQueue?.find(item => item === itemId) ?styles.hideDeleteCarIcon : ''}`} onClick={clickTrashButton}>
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

