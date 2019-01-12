import React from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const fontFamily = 'NeoSansPro_Regular';

const FormSection = props => (
  <View style={styles.half2}>
    <View style={styles.searchSection}>
      <Icon
        style={styles.icon}
        name="envelope"
        size={20}
        color="#9BAEB8" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#d0d9dd"
        underlineColorAndroid="#9BAEB8"
        onChangeText={e => props.setUsername(e)} />
    </View>
    <View style={[styles.searchSection, { marginTop: 20 }]}>
      <Icon
        style={styles.icon}
        name="lock"
        size={30}
        color="#9BAEB8" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        placeholderTextColor="#d0d9dd"
        underlineColorAndroid="#9BAEB8"
        onChangeText={e => props.setPassword(e)}
      />
    </View>

    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => props.handleLogin()}
        style={styles.btn}>
        <Text style={[styles.input, { fontSize: 16 }]}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}>
        <Text style={[styles.input, { fontSize: 16 }]}>Sign up</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.forgot}>Forgot Password?</Text>
  </View>
);

FormSection.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default FormSection;

const styles = StyleSheet.create({
  half2: {
    flex: 1,
    paddingHorizontal: width * 0.1,
  },
  searchSection: { position: 'relative' },
  icon: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
  input: {
    color: '#d0d9dd',
    fontFamily,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    borderColor: '#9BAEB8',
    borderWidth: 2,
  },
  forgot: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily,
    color: '#9BAEB8',
    fontSize: 16,
  },
});
