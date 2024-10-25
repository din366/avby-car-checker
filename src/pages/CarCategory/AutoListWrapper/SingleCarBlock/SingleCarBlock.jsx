import styles from './SingleCarBlock.module.scss';
import CombineCarDynamicsToTable from "./CombineCarDynamicsToTable/combineCarDynamicsToTable.jsx";
import avLogo from './../../../../assets/av-logo.png';
import {useDispatch} from "react-redux";
import {setFavoriteOrHiddenCar} from "../../../../store/carCategorySlice.js";

const PriceDynamics = ({usdPriceDynamics}) => {
  return (
    <div className={styles.dynamicsWrapper}>
      <span>Динамика цен (USD)</span>
      <div className={styles.dynamicsChart}>
        <CombineCarDynamicsToTable arr={usdPriceDynamics}/>
      </div>
    </div>
  );
}

const GoToSiteButton = ({url}) => {
  return (
    <a
      className={styles.goToSiteButton}
      onClick={(e) => {
        e.stopPropagation()
      }} // stop hoisting
      href={url}
      target="_blank"
    >На сайте
    </a>
  )
}

const FavoriteOrHiddenButton = ({type, carIsFavorite, carIsHidden, categoryId, carUrl}) => {
  const dispatch = useDispatch();
  const arr = carUrl.split("/");
  const carId =  arr[arr.length - 1];

  const toggleParam = (type) => {
    dispatch(setFavoriteOrHiddenCar({categoryId, carId, type}));
  }
  return (
    <>
      {type === 'favorite' ?
        <button onClick={() => {toggleParam('favorite')}} className={`${styles.favoriteButton} ${carIsFavorite ? styles.favoriteActive : ''}`}>{carIsFavorite ? 'Убрать из избранного' : 'В избранное'}</button> :
        <button onClick={() => {toggleParam('hidden')}} className={`${styles.hiddenButton} ${carIsHidden ? styles.hiddenActive : ''}`}>{carIsHidden ? 'Убрать из скрытых' : 'Скрыть'}</button>
      }
    </>
)}

const NewAndSoldDates = ({data, currentCategory}) => {
  return (
    <div className={styles.firstDateShowWrapper}>
      {currentCategory === 'sold' ? <span>Закрыта: {data.soldDate}</span> : ''}
      {data.firstShowDate ? <span>Добавлена: {data.firstShowDate}</span> : ''}
    </div>
  )
}

const DuplicatedLinks = ({duplicateAd, sliceCount, currentCategory}) => {
  return (
    <>
      {currentCategory !== 'sold' ? <span>Удаленные ({duplicateAd.length}):</span> :
        <span>История:</span>}

      <div className={styles.duplicateAds}>
        {duplicateAd.slice(-sliceCount).map(item =>
          <a className={styles.duplicateBlock}
             key={item.url}
             target='_blank'
             href={item.url}
             onClick={(e) => {
               e.stopPropagation()
             }}>
            <img src={avLogo} alt=""/>
            {item.soldDate} - {item.usdPriceDynamics[item.usdPriceDynamics.length - 1][1]} $
          </a>)}
      </div>
    </>
  )
}

const DuplicatedLinksBlock = ({currentCategory, duplicateAd}) => {
  return (
    <div className={styles.duplicateAdsWrapper}>
        <DuplicatedLinks duplicateAd={duplicateAd} sliceCount={5} currentCategory={currentCategory}/>
    </div>
  )
}

const InfoBlock = ({data, currentCategory, duplicateAd, categoryId}) => {
  return (
    <div className={styles.info}>
      <div className={styles.text}>
        <div className={styles.textTitle}>
          {data.carName}
        </div>
        <div className={styles.carPrice}>
          {data.usdPriceDynamics[data.usdPriceDynamics.length - 1][1]} $
        </div>
        <div className={styles.shortDescription}>
          {data.description ? data.description : ''}
        </div>
        <div className={styles.fullDescription}>
          {data.fullDescription ? data.fullDescription.slice(0, 200) : 'Описание отсутствует'}
        </div>

      </div>

      {data.usdPriceDynamics.length > 1 ? <PriceDynamics usdPriceDynamics={data.usdPriceDynamics}/> : ''}




      <GoToSiteButton url={data.url}/>
      <div className={styles.favoriteOrHiddenButtonsWrapper}>
        {(data.firstShowDate || data.soldDate) ?
          <NewAndSoldDates data={data} currentCategory={currentCategory}/> : ''}

        <FavoriteOrHiddenButton categoryId={categoryId} carUrl={data.url} type='favorite' carIsFavorite={data.isFavorite}/>
        <FavoriteOrHiddenButton categoryId={categoryId} carUrl={data.url} type='hidden' carIsHidden={data.isHidden}/>
      </div>

      {(duplicateAd.length && currentCategory !== 'new') ?
        <DuplicatedLinksBlock currentCategory={currentCategory} duplicateAd={duplicateAd}/> : ''}
    </div>
  )
}
// ! НАДО ОТФИКСИТЬ СИТУАЦИЮ, КОГДА В ТЕКУЩИХ МАШИНАХ ДОБАВЛЯЕТСЯ В ИЗБРАННОМ, А В ПРОДАННЫХ НЕТ
// ! В то же время когда в проданных я добавляю в избранные, то в новых аналогичная машина убирается, и наоборот
// ! т.е. мне надо при добавлении в избранное в текущих машинах пробегать по проданным и также добавлять галочку
// ! в новых будет такая же штука, надо предусмотреть
const SingleCarBlock = ({data, categoryId, duplicateAd, currentCategory}) => {
  return (
      <div className={`${styles.mainBlockWrapper} ${((currentCategory === 'current' || currentCategory === 'sold') && data.isFavorite) ? styles.mainBlockFavorite : ''}`}>
        <div className={styles.imageBlock}>
          <img src={data.img}/>
        </div>

        <InfoBlock data={data} currentCategory={currentCategory} duplicateAd={duplicateAd} categoryId={categoryId}/>
      </div>
  );
};

export default SingleCarBlock;