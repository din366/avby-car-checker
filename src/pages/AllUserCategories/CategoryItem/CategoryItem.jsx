import styles from "./CategoryItem.module.scss";
import {Link} from "react-router-dom";

const CategoryItem = ({itemId, items, name, thumb, updateTime}) => {
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
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;