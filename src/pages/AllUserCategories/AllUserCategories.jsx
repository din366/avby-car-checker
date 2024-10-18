import styles from './AllUserCategories.module.scss';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoriesData, getCategoryName} from "../../store/userCategorySlice.js";
import {Link} from "react-router-dom";

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
              <Link to={`/categories/${category.itemId}`} key={category.id}>
                <div className={styles.carCategory}>
                  <div className={styles.carCategoryImageWrapper}>
                    <img className={styles.carCategoryImage} src={category.thumb} alt=""/>
                  </div>
                  <div className={styles.carCategoryText}>
                    <span className={styles.carCategoryTitle}>Авто: {category.name}</span>
                    <span className={styles.carCategoryCarCount}>Сейчас в продаже: {category.items} шт</span>
                    <span className={styles.carCategoryUpdate}>Последнее обновление: {category.updateTime}</span>
                  </div>
                </div>
              </Link>
            )) : 'No items'}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUserCategories;