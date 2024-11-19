import styles from './AllUserCategories.module.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoriesData, getCategoryName} from "../../store/userCategorySlice.js";
import CategoryItem from "./CategoryItem/CategoryItem.jsx";
import {useLogged} from "../../features/useLogged.js";
import {getToken} from "../../store/loginSlice.js";
import {
  currentUpdate, loadingWhileWaiting,
  pushingCarLoadingWhileWaiting,
  sendStartUpdatingRequest
} from "../../store/updateCarDataSlice.js";
import AddNewCarModal from "../../elements/AddNewCarPopup/AddNewCarModal.jsx";
import DeleteCarModal from "../../elements/DeleteCarModal/DeleteCarModal.jsx";

const AllUserCategories = () => {
  useLogged();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesData);
  const currentUpdateProcess = useSelector(currentUpdate);
  const carsUpdatingStatus = Object.values(currentUpdateProcess);
  const loadingWhileWaitingData = useSelector(loadingWhileWaiting);
  const [modalIsShow, setModalIsShow] = useState(false);
  const [deleteCarModalData, setDeleteCarModalData] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getCategoryName());
    }
  }, [dispatch, token]);

  const startAllCarsUpdate = (e) => {
    e.preventDefault();
    dispatch(sendStartUpdatingRequest({carId: 'all'}));
    categories.map(item => dispatch(pushingCarLoadingWhileWaiting(item.itemId)));
  }

  return (
    <div>

      <div className='mainBlockWrapper'>
        <div className="container">
          <div className={styles.categoryHeaderWrapper}>
          <h1>Список добавленных категорий</h1>
            <div className={styles.categoryNavigationWrapper}>
              <button
                className={styles.updateAllButton}
                onClick={() => {setModalIsShow(true)}}
              >Добавить авто</button>
              <button
                disabled={carsUpdatingStatus.find(item => item === true) || loadingWhileWaitingData.length}
                className={styles.updateAllButton}
                onClick={(e) => {startAllCarsUpdate(e)}}
              >Обновить все</button>
            </div>
          </div>

          <div className={styles.carCateroryWrapper}>

            {categories ? categories.map((category) => (
              <CategoryItem
                key={category.itemId}
                itemId={category.itemId}
                thumb={category.thumb}
                name={category.name}
                items={category.items}
                updateTime={category.updateTime}
                currentUpdateProcess={currentUpdateProcess}
                loadingWhileWaitingData={loadingWhileWaitingData}
                setDeleteCarModalData={setDeleteCarModalData}
              />
            )) : 'No items'}
          </div>
        </div>
      </div>

      <AddNewCarModal modalIsShow={modalIsShow} setModalIsShow={setModalIsShow}/>
      <DeleteCarModal
        deleteCarModalData={deleteCarModalData}
        setDeleteCarModalData={setDeleteCarModalData}
      />
    </div>
  );
};

export default AllUserCategories;