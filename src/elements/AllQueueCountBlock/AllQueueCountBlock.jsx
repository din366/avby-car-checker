import {useSelector} from "react-redux";
import {allUsersQueueLength} from "../../store/updateCarDataSlice.js";
import styles from "./AllQueueCountBlock.module.scss";

const AllQueueCountBlock = () => {
  const queueCount = useSelector(allUsersQueueLength);
  return (
    <div className={styles.allQueueCountBlockWrapper}>
      <span className={`${styles.AllQueueCountBlockText} ${queueCount > 0 ? styles.showAllQueueCountBlockText : ''}`}>Авто в очереди: {queueCount}</span>
    </div>
  );
};

export default AllQueueCountBlock;