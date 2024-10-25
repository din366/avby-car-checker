import { ResponsiveLine } from '@nivo/line'
import {useEffect, useState} from "react";
import {useTheme} from "../../hooks/ThemeContext.jsx";
export const PriceChart = ({ data = []}) => {
  const fixedData = data ? {...data, data: data.data.map(item => ({...item, x: item.x.slice(0, -5)}))} : [];
  const { theme } = useTheme();
  const [textColor, setTextColor] = useState('#e8e8e8')
  useEffect(() => {
    setTextColor(theme === 'dark' ? '#e8e8e8' : '#494949');
  }, [theme]);

  const minYValue = Math.min(
    ...data.data.map(point => point.y)
  );
  const maxYValue = Math.max(
    ...data.data.map(point => point.y)
  );

  // Устанавливаем нижнюю границу графика чуть ниже минимального значения
  const yMin = minYValue > 2000 ? minYValue - 200 : 0; // Настройка под диапазон значений
  const yMax = maxYValue < 20000 ? maxYValue + 200 : 0; // Настройка под диапазон значений

  const customTheme = {
    axis: {
      ticks: {
        text: {
          fill: textColor, // цвет текста на осях
        },
      },
    },
    legends: {
      text: {
        fill: textColor, // цвет текста в легенде
      },
    },
    tooltip: {
      container: {
        background: '#333',
        color: '#efefef', // цвет текста в сносках
      },
    },
  };
  return <ResponsiveLine
    data={[fixedData]}
    margin={{ top: 20, right: 10, bottom: 60, left: 50 }}
    /*enableArea={true}*/
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: yMin,
      max: yMax,
      stacked: false,
      reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -60,
      truncateTickAt: 0
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      truncateTickAt: 0
    }}
    pointSize={10}
    pointColor="#ffffff"
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    curve='natural'
    enableGridX={false}
    theme={customTheme}
    colors={{ datum: 'color'}}
  />
}