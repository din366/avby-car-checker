import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  changeCategory,
  getCarCategory,
  getCarCategoryData, getCarCategoryDataActive,
  getCarCategoryPriceDynamics, showCategory
} from "../../store/carCategorySlice.js";
import styles from './CarCategory.module.scss';
import CarCategoryDynamicsBlock from "./CarCategoryDynamicsBlock/CarCategoryDynamicsBlock.jsx";
import AutoListWrapper from "./AutoListWrapper/AutoListWrapper.jsx";
import CarMainInfo from "./CarMainInfo/CarMainInfo.jsx";
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs.jsx";
import {useLogged} from "../../features/useLogged.js";
import {getToken} from "../../store/loginSlice.js";
import {currentUpdate} from "../../store/updateCarDataSlice.js";

const CarCategory = () => {
  useLogged();
  const {categoryId} = useParams();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const fullCategoryData = useSelector(getCarCategoryData);
  const currentUpdateProcess = useSelector(currentUpdate);
  const dynamicsData = useSelector(getCarCategoryPriceDynamics);
  const currentCategory = useSelector(showCategory);
  const getActiveCategory = useSelector(state => getCarCategoryDataActive(state, currentCategory))
  useEffect(() => {
    if (token && categoryId) {
      dispatch(getCarCategory(categoryId));
      dispatch(changeCategory('current')); // ? reset category when user go to this page
    }
  }, [dispatch, token]);

  useEffect(() => { // ? when the data update occurred, but the user is in the auto category
    if (token && categoryId) {
      dispatch(getCarCategory(categoryId));
    }
  }, [currentUpdateProcess])

  return (
    <>
      <div className='mainBlockWrapper'>
        <div className="container">
          <h1>{fullCategoryData?.currentCars?.[0] ? fullCategoryData.currentCars[0].carName : 'Категория авто'}</h1>

          <Breadcrumbs to={'/categories'}/>

          {fullCategoryData ?
            <div className={styles.carCategoryInfoWrapper}>
              <div className={styles.carCategoryInfo}>
                <CarMainInfo categoryData={fullCategoryData}/>
              </div>

              <div className={styles.carCategoryInfo}>
                {Object.values(dynamicsData).map((item) => (
                  <CarCategoryDynamicsBlock key={item.id} dynamicsData={item}/>
                ))}
              </div>

              <AutoListWrapper
                selectedCategory={currentCategory}
                selectedCategoryData={getActiveCategory}
                currentCars={fullCategoryData.currentCars}
                categoryId={categoryId}
                newCars={fullCategoryData.newCars}
                soldCars={fullCategoryData.soldCars}
              />
            </div> : ''
          }

        </div>
      </div>
    </>
  );
};

export default CarCategory;