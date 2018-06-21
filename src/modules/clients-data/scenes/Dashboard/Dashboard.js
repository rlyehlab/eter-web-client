import React, { Component } from 'react';
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
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import moment from 'moment';
// COMPONENTS
import {
  LineWidget,
  AdvanceTable
} from '../../components';
// APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class Dashboard extends Component {
  // Move function to utils
  _formatPMData(data) {
    // console.log("_formatPMData", data, data.edges);
    const PM_only = data.edges.filter(({node})=>node.sensorBySensorId["name"] === "PM5003");
    const finalObj = {
      labels: [],
      datasets: [
        {
          label: "Valor de medicion",
          borderColor: 'rgba(255,255,255,.55)',
          backgroundColor: hexToRgba(brandPrimary, 10),
          data: []
        }
      ]
    }
    if(PM_only.length > 0) {
      for(let i=0; i<PM_only.length && i<31; i++) {
        const { node } = PM_only[i];
        // finalObj["labels"].push(moment(node.dateCreated || new Date()).format("DD-MM-YYYY"));
        finalObj["labels"].push(node.sensorBySensorId["variable"]);
        const value = parseInt(node.value);
        finalObj["datasets"][0].data.push(isNaN(value) ? 0 : value);
      }
      return Object.assign({}, finalObj);
    }
  }
  // Move function to utils
  _formatUsersData(data) {
    // console.log("_formatUsersData", data, data.edges);
    const finalObj = {
      labels: [],
      datasets: [
        {
          label: "Valor de medicion",
          borderColor: 'rgba(255,255,255,.55)',
          backgroundColor: hexToRgba(brandPrimary, 10),
          data: []
        }
      ]
    }
    if(data.edges.length > 0) {
      data.edges.forEach(({node})=> {
        finalObj["labels"].push(node.userByUserId.name || node.userByUserId.email);
        finalObj["datasets"][0].data.push(node.measuresByDeviceId.totalCount || 0);
      })
      return Object.assign({}, finalObj);
    }
  }
  // Move function to utils
  _formatMeasuresDataLine(data) {
    // console.log("_formatMeasuresDataLine", data, data.edges);
    const finalObj = {
      labels: [],
      datasets: [
        {
          label: "Mediciones",
          borderColor: 'rgba(255,255,255,.55)',
          backgroundColor: hexToRgba(brandInfo, 10),
          data: []
        }
      ]
    }
    if(data.edges.length > 0) {
      for(let i=0; i<data.edges.length; i++) {
        const { node } = data.edges[i];
        finalObj["labels"].push([node.sensorBySensorId.name, node.sensorBySensorId.variable].join(": "));
        const value = parseInt(node.value);
        finalObj["datasets"][0].data.push(isNaN(value) ? 0 : value);
        if(i === 10)
          break;
      }
      return Object.assign({}, finalObj);
    }
  }

  _splitMeasuresBySensor(sensors) {
    if(sensors && sensors.edges) {
      const _sensors = {};
      sensors.edges.forEach(({node}, i)=>{
        let { name } = node;
        const { measuresBySensorId, variable, value } = node;
        const basicObj = {
          labels: measuresBySensorId.edges.map(({node})=>moment(node.dateCreated).format("dd/HH:mm")),
          datasets: []            
        };
        if(_sensors[name] && _sensors[name].datasets.length === 2) {         
          name += name;
        }
        if(!_sensors[name])
          _sensors[name] = {...basicObj};
        _sensors[name].datasets.push({
          backgroundColor: 'transparent',
          name: name,
          total: measuresBySensorId.totalCount,
          label: [node.name,variable].join(": "),
          data: measuresBySensorId.edges.map(({node})=>isNaN(parseFloat(node.value)) ? 0 : parseFloat(node.value)),
        });
      });
      return Object.values(_sensors);
    }
  }


  render() {
    console.log("render Dashboard", this.props.data);
    const { data={} } = this.props;
    const { allDevices, allMeasures, allSensors } = data;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            { allDevices ? 
              <LineWidget
                cardColor={"primary"}
                data={this._formatUsersData(allDevices)} 
                total={allDevices.totalCount}
                title="Cantidad de dispositivos"
                subtitle="Mediciones por dispositivo"
                height={100} />
              : null
            }
          </Col>

          <Col xs="12" sm="6" lg="3">
            { allMeasures ? 
              <LineWidget
                cardColor={"success"}
                data={this._formatMeasuresDataLine(allMeasures)} 
                total={allMeasures.totalCount}
                title="Cantidad de mediciones"
                subtitle="Mediciones por tipo de sensor"
                height={100} />
              : null
            }
          </Col>

          <Col xs="12" sm="6" lg="3">
            { allMeasures ? 
              <LineWidget
                cardColor={"danger"}
                data={this._formatPMData(allMeasures)} 
                total={allSensors.edges.filter(s=>s.node.name === "PM5003").reduce((o,a)=>(o.node ? o.node.measuresBySensorId.totalCount : o) + a.node.measuresBySensorId.totalCount)}
                title="Cantidad de mediciones (PM)"
                height={100} />
              : null
            }            
          </Col>
        </Row>
        <Row>
          <Col>
            { allSensors ?
              <AdvanceTable tableData={this._splitMeasuresBySensor(allSensors)}/>
              : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default graphql(gql`
  query Mesures {
    allDevices {
      totalCount
      edges {
        node {
          id
          dateCreated
          state
          geolocation
          userId
          userByUserId {
            id
            name
            email
          }
          measuresByDeviceId {
            totalCount
            edges {
              node {
                id
                dateCreated
              }
            }
          }
        }
      }
    }
    allMeasures (
      orderBy: [
        DATE_CREATED_DESC
      ]
      last: 20
    ) {
      totalCount
      edges {
        node {
          dateCreated
          sensorId
          deviceId
          value
          sensorBySensorId {
            id
            variable
            name
          }
          deviceByDeviceId {
            id
          }
        }
      }
    }
    allUsers {
      totalCount
      edges {
        node {
          id
          dateCreated
          name
          email
          devicesByUserId {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
    allSensors {
      totalCount
      edges {
        node {
          id
          name
          variable
          measuresBySensorId(
            last: 7
            orderBy: [DATE_CREATED_DESC]
          ) {
            totalCount
            edges {
              node {
                dateCreated
                value
              }
            }
          }
        }
      }
    }
  }
`)(Dashboard);
