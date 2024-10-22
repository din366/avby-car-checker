import styles from './AllUserCategories.module.scss';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoriesData, getCategoryName} from "../../store/userCategorySlice.js";
import CategoryItem from "./CategoryItem/CategoryItem.jsx";

const AllUserCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesData);

  useEffect(() => {
    dispatch(getCategoryName());
  }, [dispatch]);


  console.log(categories)
  return (
    <div>

      <div className='mainBlockWrapper'>
        <div className="container">
          <h1>Список добавленных категорий</h1>

          <div className={styles.carCateroryWrapper}>

            {categories ? categories.map((category) => (
              <CategoryItem
                key={category.itemId}
                itemId={category.itemId}
                thumb={category.thumb}
                name={category.name}
                items={category.items}
                updateTime={category.updateTime}
              />

            )) : 'No items'}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUserCategories;