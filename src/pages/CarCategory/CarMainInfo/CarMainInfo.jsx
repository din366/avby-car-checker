import styles from "../CarCategory.module.scss";

const CarMainInfo = ({categoryData}) => {
  return (
    <>
      <div className={styles.carCategoryTextBlock}>
        Всего в продаже: {categoryData.itemsCount} шт
      </div>

      <div className={styles.carCategoryTextBlock}>
        Новых авто: {categoryData.newCars.length} шт
      </div>
      <div className={styles.carCategoryTextBlock}>
        Последняя дата обновления: {categoryData.updateTime}
      </div>
    </>
  );
};

export default CarMainInfo;