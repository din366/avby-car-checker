import styles from "./DynamicsPriceDataBlock.module.scss";
import greenArrow from "../../../../assets/arrows/arrow-green.png";
import redArrow from "../../../../assets/arrows/arrow-red.png";

const DynamicsPriceDataBlock = ({prices, placeholder}) => {
  return (
    <div className={styles.pricesBlockWrapper}>
      <span className={styles.priceBlockTitle}>{placeholder}</span>: {prices.length > 1 ?
      <div className={styles.pricesBlock}>
        {prices[1] - prices[0] > 0 ? <img className={styles.greenArrow} src={greenArrow}/> : ''}
        {prices[1] - prices[0] < 0 ? <img className={styles.redArrow} src={redArrow}/> : ''}
        <span>{prices[1]} ({prices[1] - prices[0] > 0 ? `+${prices[1] - prices[0]}` : prices[1] - prices[0]} $)</span>
      </div> : <div className={styles.pricesBlock}>{prices} $</div>}
    </div>
  )
}

export default DynamicsPriceDataBlock;