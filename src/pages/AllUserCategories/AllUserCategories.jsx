import styles from './AllUserCategories.module.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allUserCategoriesIsLoading, categoriesData, getCategoryName} from "../../store/userCategorySlice.js";
import CategoryItem from "./CategoryItem/CategoryItem.jsx";
import {useLogged} from "../../features/useLogged.js";
import {getToken} from "../../store/loginSlice.js";
import {currentQueue, currentUpdate, sendStartUpdatingRequest} from "../../store/updateCarDataSlice.js";
import AddNewCarModal from "../../elements/AddNewCarPopup/AddNewCarModal.jsx";
import DeleteCarModal from "../../elements/DeleteCarModal/DeleteCarModal.jsx";


const AllUserCategories = () => {
  useLogged();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesData);
  const isLoading = useSelector(allUserCategoriesIsLoading);
  const currentUpdateProcess = useSelector(currentUpdate);
  const currentQueueData = useSelector(currentQueue);

  const [modalIsShow, setModalIsShow] = useState(false);
  const [deleteCarModalData, setDeleteCarModalData] = useState(false);
  const loadingNewCarDataIsTrue = () => {
    if (currentUpdateProcess?.carId.split('-')[0] === 'add' && currentUpdateProcess.status === 'process') { // ? new car update in current task
      return true;
    } else if (currentQueueData.find(item => item.split('-')[0] === 'add')) { // ? new car update in queue
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (token) {
      dispatch(getCategoryName());
    }
  }, [dispatch, token, categories?.length, /*currentUpdateProcess?.length*/]); // ! пока что не обновляются данные после обновления авто

  const startAllCarsUpdate = (e) => {
    e.preventDefault();
    dispatch(sendStartUpdatingRequest({carId: 'all'}));
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
                disabled={isLoading}
              >Добавить авто</button>
              {categories?.length > 1 ? <button
                disabled={currentUpdateProcess?.status === 'process' || currentQueueData.length || categories?.length === 0}
                className={styles.updateAllButton}
                onClick={(e) => {
                  startAllCarsUpdate(e)
                }}
              >Обновить все</button> : ''}

            </div>
          </div>
          {categories && categories.length ?
            <div className={styles.carCateroryWrapper}>
              {categories.map((category) => (
                <CategoryItem
                  key={category.itemId}
                  itemId={category.itemId}
                  thumb={category.thumb}
                  name={category.name}
                  items={category.items}
                  updateTime={category.updateTime}
                  currentUpdateProcess={currentUpdateProcess}
                  setDeleteCarModalData={setDeleteCarModalData}
                />
              ))}
              {loadingNewCarDataIsTrue() ?
                <CategoryItem
                  key={currentUpdateProcess?.carId}
                  itemId={null}
                  thumb={null}
                  name={null}
                  items={null}
                  updateTime={null}
                  currentUpdateProcess={currentUpdateProcess}
                /> : ''
              }
            </div> : (!categories?.length && loadingNewCarDataIsTrue()) ? // if current car list item is null
              <div className={styles.carCateroryWrapper}>
                <CategoryItem
                  key={currentUpdateProcess?.carId}
                  itemId={null}
                  thumb={null}
                  name={null}
                  items={null}
                  updateTime={null}
                  currentUpdateProcess={currentUpdateProcess}
                />
              </div>
                :
                <div className={styles.noCarTextBlock}>Добавьте новое авто для мониторинга</div>
                }

              </div>
            </div>

            <AddNewCarModal modalIsShow={modalIsShow} setModalIsShow={setModalIsShow}/>
            <DeleteCarModal deleteCarModalData={deleteCarModalData} setDeleteCarModalData={setDeleteCarModalData}/>
    </div>
  );
};

export default AllUserCategories;