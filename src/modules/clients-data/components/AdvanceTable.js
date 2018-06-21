import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import ItemsTable from './ItemsTable';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const styles = [brandInfo, brandWarning, brandDanger, brandPrimary, brandSuccess];
const stringColors = ["info","warning","danger","primary","success"];

class AdvanceTable extends React.Component {
  render () {
    const _title = "Mediciones, dispositivos y usuarios";
    const { title=_title, tableData=[] } = this.props;
    console.log("tableData");
    console.log(tableData);
    return (
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <Row>
            { tableData.map(({labels, datasets}, i) => (
              <Col xs="12" md="6" xl="6" key={i.toString()}>
                <Row>
                  { datasets.map(({total, label, name, ...rest}, ii)=> (
                    <Col sm={(datasets.length % 2 === 0) ? "6" : "12"} key={ii.toString()} >
                      <ItemsTable 
                        total={total}
                        title={label}
                        color={stringColors[ii]}
                        data={{labels, datasets: [{...rest, label, borderColor: styles[ii]}]}}
                      />
                    </Col>
                  ))}
                </Row>
                { labels.map((label, i)=> (
                  <div key={i.toString()}>
                    <hr className="mt-0" />
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          { label }
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        { datasets.map((d, ii)=>
                          <Progress className="progress" key={ii.toString()} animated color={stringColors[ii]} value={d.data[i]}>{d.data[i]}</Progress>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="legend text-center">
                  <small>
                    { datasets.map((d, i) => (
                      <span key={i.toString()}>
                        <sup className="px-1"><Badge pill color={stringColors[i]}>&nbsp;</Badge></sup>
                        { d.label }
                      </span>
                    ))}
                  </small>
                </div>
              </Col>
            ))}
            {/*
            <Col xs="12" md="6" xl="6">
              <Row>
                <Col sm="6">
                  <ItemsTable 
                    total={400}
                    title="Caracoles"
                    data={makeSparkLineData(0, brandPrimary)}
                  />
                </Col>
                <Col sm="6">
                  <div className="callout callout-danger">
                    <small className="text-muted">Recurring Clients</small>
                    <br />
                    <strong className="h4">22,643</strong>
                    <div className="chart-wrapper">
                      <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                    </div>
                  </div>
                </Col>
              </Row>
              <hr className="mt-0" />
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                    Monday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="34" />
                  <Progress className="progress-xs" color="danger" value="78" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Tuesday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="56" />
                  <Progress className="progress-xs" color="danger" value="94" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Wednesday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="12" />
                  <Progress className="progress-xs" color="danger" value="67" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Thursday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="43" />
                  <Progress className="progress-xs" color="danger" value="91" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Friday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="22" />
                  <Progress className="progress-xs" color="danger" value="73" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Saturday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="53" />
                  <Progress className="progress-xs" color="danger" value="82" />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">
                  Sunday
                  </span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="info" value="9" />
                  <Progress className="progress-xs" color="danger" value="69" />
                </div>
              </div>
              <div className="legend text-center">
                <small>
                  <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                  New clients
                  &nbsp;
                  <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                  Recurring clients
                </small>
              </div>
            </Col>
            <Col xs="12" md="6" xl="6">
              <Row>
                <Col sm="6">
                  <div className="callout callout-warning">
                    <small className="text-muted">Pageviews</small>
                    <br />
                    <strong className="h4">78,623</strong>
                    <div className="chart-wrapper">
                      <Line data={makeSparkLineData(2, brandWarning)} options={sparklineChartOpts} width={100} height={30} />
                    </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="callout callout-success">
                    <small className="text-muted">Organic</small>
                    <br />
                    <strong className="h4">49,123</strong>
                    <div className="chart-wrapper">
                      <Line data={makeSparkLineData(3, brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
                    </div>
                  </div>
                </Col>
              </Row>
              <hr className="mt-0" />
              <ul>
                <div className="progress-group">
                  <div className="progress-group-header">
                    <i className="icon-user progress-group-icon"></i>
                    <span className="title">Male</span>
                    <span className="ml-auto font-weight-bold">43%</span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="warning" value="43" />
                  </div>
                </div>
                <div className="progress-group mb-5">
                  <div className="progress-group-header">
                    <i className="icon-user-female progress-group-icon"></i>
                    <span className="title">Female</span>
                    <span className="ml-auto font-weight-bold">37%</span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="warning" value="37" />
                  </div>
                </div>
                <div className="progress-group">
                  <div className="progress-group-header">
                    <i className="icon-globe progress-group-icon"></i>
                    <span className="title">Organic Search</span>
                    <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="success" value="56" />
                  </div>
                </div>
                <div className="progress-group">
                  <div className="progress-group-header">
                    <i className="icon-social-facebook progress-group-icon"></i>
                    <span className="title">Facebook</span>
                    <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="success" value="15" />
                  </div>
                </div>
                <div className="progress-group">
                  <div className="progress-group-header">
                    <i className="icon-social-twitter progress-group-icon"></i>
                    <span className="title">Twitter</span>
                    <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="success" value="11" />
                  </div>
                </div>
                <div className="progress-group">
                  <div className="progress-group-header">
                    <i className="icon-social-linkedin progress-group-icon"></i>
                    <span className="title">LinkedIn</span>
                    <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="success" value="8" />
                  </div>
                </div>
                <div className="divider text-center">
                  <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                          title="" data-original-title="show more"><i className="icon-options"></i></Button>
                </div>
              </ul>
            </Col>*/}
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default AdvanceTable;