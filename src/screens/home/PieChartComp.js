/* eslint no-underscore-dangle: 0, no-prototype-builtins: 0,
 no-restricted-syntax: 0, no-console: 0 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PieChart from 'react-native-pie-chart';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';

const ROOT_URL = 'http://192.168.42.33:5000';

export default class PieChartComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: [],
      series: [],
    };
    this.socket = io('http://192.168.42.33:5000');

    this.socket.on('connect', () => {
      console.log('connect to server');
    });

    this.socket.on('newVote', (res) => {
      console.log('new vote');
      this.reload(res);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  componentWillMount() {
    axios.get(`${ROOT_URL}/vote`)
      .then((res) => { this.reload(res.data); })
      .catch((error) => { console.log(error); });
  }

  reload = (value) => {
    const candidate = value.filter(item => item.name);
    const series = [];
    for (const iterator of candidate) {
      const x = this.countVoter(iterator);
      series.push(x);
    }
    this.setState({ candidate, series });
  }

  countVoter = (value) => {
    const objCopy = Object.assign({}, value);
    delete objCopy._id;
    delete objCopy.name;

    let x = 0;
    let total = 0;

    for (const iterator in objCopy) {
      if (value.hasOwnProperty(iterator)) {
        total = x + value[iterator];
        x = total;
      }
    }

    return total;
  }

  countAll = () => {
    const { candidate } = this.state;
    const newArray = [];

    for (const iterator of candidate) {
      const a = Object.assign({}, iterator);
      newArray.push(a);
    }

    let total = 0;
    let x = 0;

    for (const iterator of newArray) {
      delete iterator._id;
      delete iterator.name;
    }

    for (const iterator of newArray) {
      for (const iterator2 in iterator) {
        if (iterator.hasOwnProperty(iterator2)) {
          total = x + iterator[iterator2];
          x = total;
        }
      }
    }

    return total;
  }

  countFree = () => {
    const max = 468;
    const income = this.countAll();
    const result = max - income;

    return result;
  }

  countPercent = () => {
    const max = 468;
    const total = this.countAll();
    const percent = Math.round(total / max * 100);
    const result = percent > 9 ? percent : `0${percent}`;

    return result;
  }


  render() {
    const chartWh = 150;
    const sliceColor = ['#39A6DD', '#A2D5EE'];
    const { candidate, series } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 3 }}>
            <Text style={[styles.font, styles.color]}>Incoming Vote</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={[styles.font, styles.color]}>More</Text>
            <Icon
              name="chevron-right"
              style={[styles.color, { paddingLeft: 5, alignSelf: 'center' }]} />
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <View style={{ flex: 1, position: 'relative' }}>
            <PieChart
              chart_wh={chartWh}
              series={series}
              sliceColor={sliceColor}
              doughnut
              coverRadius={0.7}
              coverFill="#3C394E" />
            <Text style={[styles.font, styles.color, styles.percent]}>
              {this.countPercent()}<Text style={{ fontSize: 22 }}>%</Text>
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.color, styles.font]}>Total:</Text>
              <Text style={[styles.color, styles.font]}>{this.countAll()} Vote</Text>
            </View>
            <View>
              <Text style={[styles.color, styles.font]}>Free:</Text>
              <Text style={[styles.color, styles.font]}>{this.countFree()} Vote</Text>
            </View>
          </View>
        </View>


        <View style={{ marginTop: 15 }}>
          {candidate.map((item, index) => (
            <View style={styles.labelName} key={item._id}>
              <View style={[styles.square, { backgroundColor: sliceColor[index] }]} />
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={[styles.color, styles.font]}>{item.name}</Text>
                <Text style={[styles.color2, styles.font]}>{this.countVoter(item)} Vote</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C394E',
    borderRadius: 4,
    padding: 15,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: '#5F5C70',
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chartWrapper: {
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  percent: {
    fontSize: 35,
    position: 'absolute',
    bottom: '38%',
    left: 48,
  },
  labelName: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  square: {
    height: 10,
    width: 10,
    flex: 0,
    marginRight: 5,
    marginTop: 2,
  },
  color: { color: '#FFFFFD' },
  color2: { color: '#C4C4C4' },
  font: { fontFamily: 'NeoSansPro_Regular' },
});
