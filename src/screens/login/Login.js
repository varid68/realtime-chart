import React from 'react';
import { View, Text, ImageBackground, StatusBar, ToastAndroid, StyleSheet, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormSection from './FormSection';

const fontFamily = 'NeoSansPro_Regular';

export default class Login extends React.Component {
  static propTypes = { navigator: PropTypes.any.isRequired }

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
  }

  state = {
    username: '',
    password: '',
    bg: [],
  }

  componentWillMount() {
    const random = [
      { source: require('../../assets/good_morning_img.png'), text: 'Good Morning' },
      { source: require('../../assets/good_night_img.png'), text: 'Good Night' },
      { source: require('../../assets/good_morning_img.png'), text: 'Good Morning' },
      { source: require('../../assets/good_night_img.png'), text: 'Good Night' },
    ];

    const index = Math.floor(Math.random() * 3) + 0;
    const result = random[index];
    this.setState({ bg: result });
  }

  handleLogin = () => {
    const { navigator } = this.props;
    const url = 'http://192.168.42.33:5000/auth';
    const { username, password } = this.state;
    axios.post(url, { username, password })
      .then((response) => {
        if (response.data.length > 0) {
          navigator.push({
            screen: 'screen.Home',
            animated: true,
          });
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Kombinasi Username / Password salah..',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25, 50,
          );
        }
      })
      .catch(() => {
        // console.log(error);
      });
  }

  setUsername = username => this.setState({ username })

  setPassword = password => this.setState({ password });

  render() {
    const { bg } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <StatusBar
          translucent
          backgroundColor="rgba(256,256,256, .1)" />
        <ImageBackground
          style={styles.body}
          source={bg.source}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.half1}>
              <Text style={styles.good}>{bg.text}</Text>
              <Text style={styles.we}>We pursue a relaxed gaming experience</Text>
            </View>
            <FormSection
              setUsername={this.setUsername}
              setPassword={this.setPassword}
              handleLogin={this.handleLogin} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  half1: {
    flex: 1,
    paddingTop: '20%',
  },
  good: {
    color: '#FFF',
    fontSize: 47,
    fontFamily,
    textAlign: 'center',
  },
  we: {
    color: '#90b1b8',
    fontSize: 12,
    fontFamily,
    textAlign: 'center',
  },
});
