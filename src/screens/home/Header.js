import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Header = props => (
  <View style={styles.titleContainer}>
    <View style={styles.center}>
      <Text style={[styles.color, styles.font]}>Dashboard Voting</Text>
    </View>
    <TouchableOpacity
      onPress={() => props.navigator.push({
        screen: 'screen.Login',
        animated: true,
      })}>
      <View style={{ flex: 0 }}>
        <Image
          source={require('../../assets/noun_logout_1877422.png')}
          style={{ width: 22, height: 22 }} />
      </View>
    </TouchableOpacity>
  </View>
);

Header.propTypes = { navigator: PropTypes.any.isRequired };

export default Header;

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row' },
  center: {
    flex: 2,
    justifyContent: 'center',
  },
  color: { color: '#AD5EF5' },
  font: {
    fontFamily: 'NeoSansPro_Regular',
    fontSize: 18,
  },
});
