import React from 'react';
import {
  Card,
  CardBody,
  // ButtonGroup,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Line } from 'react-chartjs-2';

class LineWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownState: false
    };
  }

  render() {
    const { data={}, total, title, subtitle, height, cardColor } = this.props;
    const minMath = Math.min.apply(Math, data.datasets[0].data);
    const maxMath = Math.max.apply(Math, data.datasets[0].data);
    const cardChartOpts2 = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },

          }],
        yAxes: [
          {
            display: true,
            ticks: {
              display: true,
              min: 0,
              max: (maxMath + (maxMath * 0.2))
            },
          }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    };
    const lineDefaultProps = { options: cardChartOpts2 };
    const lineProps = {...lineDefaultProps, ...this.props};
    return (
      <Card className={"text-white bg-"+(cardColor || "")}>
        <CardBody className="pb-0">
          {/*}
          <ButtonGroup className="float-right">
            <ButtonDropdown id='card1' isOpen={this.state.dropdownState} toggle={() => { this.setState({ dropdownState: !this.state.dropdownState }); }}>
              <DropdownToggle caret className="p-0" color="transparent">
                <i className="icon-settings"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem disabled>Disabled action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        */}
          <div><span className="text-value">{total}</span> / {title}</div>
          <div>{subtitle}</div>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{ height }}>
          <Line { ...lineProps } />
        </div>
      </Card>
    )
  }
}

export default LineWidget;