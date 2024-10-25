import styles from "./CarCategoryDynamicsBlock.module.scss";
import {PriceChart} from "../../../elements/PriceChart/PriceChart.jsx";

const CarCategoryDynamicsBlock = ({dynamicsData}) => {
  const lastDataChild = dynamicsData.data[dynamicsData.data.length - 1];
  return (
    <div className={styles.carCategoryDynamicsBlock}>
      <div className={styles.carCategoryDymamicsTitle}>{dynamicsData.id} (посл. {lastDataChild.x} - {lastDataChild.y} $)</div>
      <PriceChart data={dynamicsData}/>
    </div>
  );
};

export default CarCategoryDynamicsBlock;