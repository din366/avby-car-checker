import styles from './Breadcrumbs.module.scss';
import {useNavigate} from "react-router-dom";

const Breadcrumbs = ({to}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.breadcrumbs}>
      <span onClick={() => {navigate(to)}}>&#171; Назад</span>
    </div>
  );
};

export default Breadcrumbs;