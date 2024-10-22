import styles from './CombineCarDynamicsToTable.module.scss';
import greenArrow from './../../../../../assets/arrows/arrow-green.png';
import redArrow from './../../../../../assets/arrows/arrow-red.png';

const CombineCarDynamicsToTable = ({arr}) => {
  const slicedArray = arr.slice(-5);
  return (
    <table className={styles.table}>
      <thead>
      <tr className={styles.tr}>
        {slicedArray.map((item, index) => (
          <th key={`title-${index}`}>{item[0]}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      <tr className={styles.tr}>
        {slicedArray.map((item, index) => {
          /*console.log(`
            Больше ли
            ${arr[index]?.[1] > arr[index - 1]?.[1]}
            Текущая дата: ${arr[index]?.[0]} - ${arr[index]?.[1]}
            Предыдущая дата: ${arr[index - 1]?.[0]} - ${arr[index - 1]?.[1]}
          `)*/
          if (slicedArray[index]?.[1] > slicedArray[index - 1]?.[1]) {
            return <td key={`data-${index}`}>
              <img className={styles.greenArrow} src={greenArrow}/>
              {item[1]} (+{slicedArray[index]?.[1] - slicedArray[index - 1]?.[1]})
            </td>
          }
          if (slicedArray[index]?.[1] < slicedArray[index - 1]?.[1]) {
            return <td key={`data-${index}`}>
              <img className={styles.redArrow} src={redArrow}/>
              {item[1]} ({slicedArray[index]?.[1] - slicedArray[index - 1]?.[1]})
            </td>
          }
          return <td key={`data-${index}`}>{item[1]}</td>
        })}
      </tr>
      </tbody>
    </table>
  );
};

export default CombineCarDynamicsToTable;