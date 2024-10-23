import styles from "./AutoListWrapper.module.scss";
import SingleCarBlock from "./SingleCarBlock/SingleCarBlock.jsx";
import {useDispatch} from "react-redux";
import {changeCategory} from "../../../store/carCategorySlice.js";

const AutoListWrapper = ({currentCars, categoryId, newCars, soldCars, selectedCategoryData, selectedCategory}) => {
  const dispatch = useDispatch();

  const setCategory = (category) => {
    dispatch(changeCategory(category));
  }

  return (
    <>
      <div className={styles.changeCategoryButtonsWrapper}>
        <button className={selectedCategory === 'current' ? styles.active : ''} onClick={() => {setCategory('current')}}>Сейчас в продаже {currentCars.length}</button>
        <button className={selectedCategory === 'new' ? styles.active : ''} onClick={() => {setCategory('new')}}>Новые авто {newCars.length}</button>
        <button className={selectedCategory === 'sold' ? styles.active : ''} onClick={() => {setCategory('sold')}}>Закрытые объявления {soldCars.length}</button>
        <button className={selectedCategory === 'disabled' ? styles.active : ''} onClick={() => {setCategory('disabled')}}>Исключенные</button>
      </div>

      {selectedCategoryData.length ? selectedCategoryData.map(item => {
        return <SingleCarBlock
          currentCategory={selectedCategory}
          key={item.url}
          data={item} categoryId={categoryId}
          duplicateAd={soldCars ? soldCars.filter(soldCar => { // get other duplicate ads for current car
            return soldCar.vin === item.vin
          }) : ''}
        />
      }) : <div className={styles.noAutoBlock}>В данной категории нет авто</div>}
    </>
  );
};

export default AutoListWrapper;