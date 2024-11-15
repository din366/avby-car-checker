import styles from "./ProgressBarComponent.module.scss";
import {useSelector} from "react-redux";
import {getUpdatingCount} from "../../../../store/updateCarDataSlice.js";
import {useEffect, useRef} from "react";
import ProgressBar from "progressbar.js";

const ProgressBarComponent = ({itemId, currentUpdateProcess}) => {
  const currentUpdatingInfo = useSelector(getUpdatingCount);
  const circleRef = useRef(null);

  useEffect(() => {
    circleRef.current = new ProgressBar.SemiCircle(`#progressBarContainer-${itemId}`, {
      strokeWidth: 6,
      color: '#efefef',
      trailColor: '#eee',
      trailWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: true
      },
      from: {color: '#efefef'},
      to: {color: '#226bd3'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
    circleRef.current.text.style.fontFamily = 'Roboto, sans-serif';
    circleRef.current.text.style.fontSize = '15px';
    circleRef.current.setText('0/-');
    return () => {
      circleRef.current.destroy();
    }
  }, [itemId]);
  useEffect(() => {
    if (circleRef.current && currentUpdatingInfo.carId === itemId) {
      circleRef.current.animate(currentUpdatingInfo.countStatus / currentUpdatingInfo.carsCount || 0);
      circleRef.current.setText(`${currentUpdatingInfo.countStatus}/${currentUpdatingInfo.carsCount}`);
    } else if (circleRef.current && currentUpdatingInfo.carId !== itemId) {
      circleRef.current.animate(0);
      circleRef.current.setText('0/-');
    }
  }, [currentUpdatingInfo]);

  return (
    <div className={`${styles.loadingProgressBar} ${(currentUpdateProcess[itemId] === true) ? styles.activeLoadingProgressBar : ''}`} id={`progressBarContainer-${itemId}`}></div>
  );
};

export default ProgressBarComponent;