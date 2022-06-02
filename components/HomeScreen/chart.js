import { VictoryPie, VictoryLabel } from 'victory-native';
import {Svg} from 'react-native-svg';
import {format} from '../../components/Utils/moneyFormat.js';
import { COLORS } from "../../constants/themes";
import {categoriesData} from '../../data/category.js';
import { Dimensions } from 'react-native';

export function renderChart(categories) {
    let chartData = categoriesData.map((item) => {
      return {
        total: categories[item.id],
        color: item.color
      }
    })
    const width = Dimensions.get('window').width;
    // filter out categories with no data/expenses
    let filterChartData = chartData.slice(0,-1).filter(a => a.total > 0)
    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.total || 0), 0)
    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        return {
          y: item.total,
        }
    })
    let chartColors = filterChartData.map((item) => item.color)
    return (
      <Svg>
        <VictoryPie
          standalone={false}
          width={width} height={300}
          colorScale = {chartColors}
          data={finalChartData}
          innerRadius={110} 
          radius = {120}
          style={{ labels: { display: "none" } }}
          startAngle = {30}
          endAngle = {390}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 25, fill: COLORS.lightGreen}}
          x={width/2} y={180}
          text={format(chartData.slice(-1)[0].total)}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={width/2} y={140}
          text= {format(totalExpense)}
        />
      </Svg>
    );
  }