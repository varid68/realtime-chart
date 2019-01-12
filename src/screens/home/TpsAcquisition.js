/* eslint no-underscore-dangle: 0, no-prototype-builtins: 0,
 no-restricted-syntax: 0, no-console: 0, no-plusplus: 0 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';

const ROOT_URL = 'http://192.168.42.33:5000';

export default class TpsAcquisition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      propTps: [],
    };
    this.socket = io('http://192.168.42.33:5000');

    this.socket.on('connect', () => {
      console.log('connect to server');
    });

    this.socket.on('newVote', (res) => {
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
    const copyArray = value.map(item => ({ ...item }));
    const totalVoteinTps = copyArray.filter(item => item.name);
    const maxVoteInTps = copyArray.filter(item => item.total_voter);
    const data = [];

    for (const iterator of totalVoteinTps) {
      delete iterator._id;
      delete iterator.name;
    }
    const propTps = Object.keys(totalVoteinTps[0]);

    for (let index = 0; index < propTps.length; index++) {
      const e = totalVoteinTps.reduce((a, b) => a + b[propTps[index]], 0);
      const result = { [propTps[index]]: e };
      data.push(result);
    }

    for (const iterator of maxVoteInTps) {
      delete iterator._id;
      delete iterator.total_voter;
    }
    const propMaxTps = Object.keys(maxVoteInTps[0]);

    for (let index = 0; index < data.length; index++) {
      data[index].max = maxVoteInTps[0][propMaxTps[index]];
      data[index].percent = Math.round(data[index][propTps[index]] / maxVoteInTps[0][propMaxTps[index]] * 100);
    }

    for (let index = 0; index < data.length; index++) {
      const id = Math.random().toString(36).substring(7);
      data[index].id = id;
    }

    this.setState({ data, propTps });
  }


  render() {
    const { data, propTps } = this.state;
    const color = ['#E63D6F', '#FEAA31', '#720679', '#9AC210', '#01989F', '#39A6DD'];

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {data.map((item, index) => (
            <View style={{ width: '33%', marginBottom: 15 }} key={item.id}>
              <View style={styles.row}>
                <View style={[styles.square, { backgroundColor: color[index] }]} />
                <Text style={[styles.color, styles.font]}>TPS 0{index + 1}</Text>
              </View>
              <Text style={[styles.color2, styles.font, { marginLeft: 15 }]}>
                {item[propTps[index]]}/{item.max} - {item.percent}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  color: { color: '#FFFFFD' },
  font: { fontFamily: 'NeoSansPro_Regular' },
  row: { flexDirection: 'row' },
  square: {
    width: 10,
    height: 10,
    marginRight: 5,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#3C394E',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  color2: {
    color: '#C4C4C4',
    fontSize: 11,
  },
});
