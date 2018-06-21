import React from 'react';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Line } from 'react-chartjs-2';

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

const ItemTable = ({title, total, data, color}) => (
  <div className={"callout callout-"+color}>
    <small className="text-muted">{title}</small>
    <br />
    <strong className="h4">{total}</strong>
    <div className="chart-wrapper">
      <Line data={data} options={sparklineChartOpts} width={100} height={30} />
    </div>
  </div>
);

export default ItemTable;