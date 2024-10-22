import styles from './SingleCarBlock.module.scss';
import {Link} from "react-router-dom";
import CombineCarDynamicsToTable from "./CombineCarDynamicsToTable/combineCarDynamicsToTable.jsx";
import avLogo from './../../../../assets/av-logo.png';


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

const NewAndSoldDates = ({data, currentCategory}) => {
  return (
    <div className={styles.firstDateShowWrapper}>
      {currentCategory === 'sold' ? <span>Закрыта: {data.soldDate}</span> : ''}
      {data.firstShowDate ? <span>Добавлена: {data.firstShowDate}</span> : ''}
    </div>
  )
}

const DuplicatedLinksBlock = ({currentCategory, duplicateAd}) => {
  return (
    <div className={styles.duplicateAdsWrapper}>
      {/*{currentCategory === 'current' || currentCategory === 'disabled' ?*/}
        <DuplicatedLinks duplicateAd={duplicateAd} sliceCount={5} currentCategory={currentCategory}/>
       {/* : <DuplicatedLinks duplicateAd={duplicateAd} sliceCount={1}/>
      }*/}
    </div>
  )
}

const InfoBlock = ({data, currentCategory, duplicateAd}) => {
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

      {data.usdPriceDynamics.length > 1 && currentCategory !== 'new' ?
        <PriceDynamics usdPriceDynamics={data.usdPriceDynamics}/> : ''}


      {(data.firstShowDate || data.soldDate) ?
        <NewAndSoldDates data={data} currentCategory={currentCategory}/> : ''}

      <GoToSiteButton url={data.url}/>

      {(duplicateAd.length && currentCategory !== 'new') ?
        <DuplicatedLinksBlock currentCategory={currentCategory} duplicateAd={duplicateAd}/> : ''}
    </div>
  )
}

const SingleCarBlock = ({data, categoryId, duplicateAd, currentCategory}) => {
  const splittingLinkArray = data.url.split('/');
  return (
    <Link className={styles.mainLink}
          to={`/categories/${categoryId}/${splittingLinkArray[splittingLinkArray.length - 1]}`}>
      <div className={styles.mainBlockWrapper}>
        <div className={styles.imageBlock}>
          <img src={data.img}/>
        </div>

        <InfoBlock data={data} currentCategory={currentCategory} duplicateAd={duplicateAd}/>
      </div>
    </Link>
  );
};

export default SingleCarBlock;