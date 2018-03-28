import React, { Component } from 'react';
import Chartist from 'chartist';
import styles from './chart.scss';

class Chart extends Component {
  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const { passes, failures } = this.props;
    new Chartist.Pie(this.node, {
      series: [ passes, failures ]
    }, {
      classNames: {
        sliceDonutSolid: 'chart-slice'
      },
      chartPadding: 0,
      donut: true,
      donutSolid: true,
      donutWidth: 9,
      ignoreEmptyValues: true,
      showLabel: false,
      startAngle: 180
    });
  }

  render() {
    return (
      <div
        className="chart-wrap ct-chart"
        ref={ node => { this.node = node; } }
      />
    );
  }
}

export default Chart;
