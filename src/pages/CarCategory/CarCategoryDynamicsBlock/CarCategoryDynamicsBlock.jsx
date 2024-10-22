import styles from "./CarCategoryDynamicsBlock.module.scss";
import {PriceChart} from "../../../elements/PriceChart/PriceChart.jsx";

const CarCategoryDynamicsBlock = ({dynamicsData}) => {
  return (
    <div className={styles.carCategoryDynamicsBlock}>
      <div className={styles.carCategoryDymamicsTitle}>{dynamicsData.id}</div>
      <PriceChart data={dynamicsData}/>
    </div>
  );
};

export default CarCategoryDynamicsBlock;