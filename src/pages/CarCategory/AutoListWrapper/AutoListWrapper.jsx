import styles from "./AutoListWrapper.module.scss";
import SingleCarBlock from "./SingleCarBlock/SingleCarBlock.jsx";
import {useDispatch} from "react-redux";
import {changeCategory} from "../../../store/carCategorySlice.js";

const AutoListWrapper = ({currentCars, categoryId, newCars, soldCars, selectedCategoryData, selectedCategory}) => {
  const dispatch = useDispatch();

  let forMappingSelectedCategory = selectedCategoryData;
  if (selectedCategory === 'current') {
    forMappingSelectedCategory = selectedCategoryData.filter(item => item.isHidden !== true);
  }

  const setCategory = (category) => {
    dispatch(changeCategory(category));
  }

  return (
    <>
      <div className={styles.changeCategoryButtonsWrapper}>
        <button className={selectedCategory === 'favorite' ? styles.active : ''} onClick={() => {setCategory('favorite')}}>Избранные в продаже {currentCars.filter(item => item.isFavorite).length}</button>
        <button className={selectedCategory === 'current' ? styles.active : ''} onClick={() => {setCategory('current')}}>Сейчас в продаже {currentCars.length} (скрыто {currentCars.filter(item => item.isHidden).length})</button>
        <button className={selectedCategory === 'new' ? styles.active : ''} onClick={() => {setCategory('new')}}>Новые авто {newCars.length}</button>
        <button className={selectedCategory === 'sold' ? styles.active : ''} onClick={() => {setCategory('sold')}}>Закрытые объявления {soldCars.length}</button>
        <button className={selectedCategory === 'disabled' ? styles.active : ''} onClick={() => {setCategory('hidden')}}>Скрытые в продаже {currentCars.filter(item => item.isHidden).length}</button>
      </div>

      {selectedCategoryData.length ? forMappingSelectedCategory.map(item => {
        return <SingleCarBlock
          currentCategory={selectedCategory}
          key={item.url}
          data={item}
          categoryId={categoryId}
          duplicateAd={soldCars ? soldCars.filter(soldCar => { // get other duplicate ads for current car
            return soldCar.vin === item.vin
          }) : ''}
        />
      }) : <div className={styles.noAutoBlock}>В данной категории нет авто</div>}
    </>
  );
};

export default AutoListWrapper;