import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BrokenVote = () => (
  <View style={styles.container}>
    <View style={styles.border}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.color, styles.font]}>Invalid Vote</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.color, styles.font]}>120</Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={[styles.color, styles.font]}>More</Text>
        <Icon
          name="chevron-right"
          style={[styles.color, { paddingLeft: 5, alignSelf: 'center' }]} />
      </View>
    </View>


    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/vote.png')}
        style={styles.image} />
      <Text style={[styles.color, styles.font, { flex: 1 }]}>
        Incididunt ea laborum sint ullamco laboris ut commodo sit laboris ipo cupidatat et...
      </Text>
    </View>
  </View>
);

export default BrokenVote;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C394E',
    borderRadius: 4,
    padding: 15,
    marginTop: 20,
  },
  border: {
    borderBottomColor: '#5F5C70',
    borderBottomWidth: 1,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  image: {
    height: 50,
    width: 50,
    flex: 0,
    marginRight: 15,
  },
  color: { color: '#FFFFFD' },
  font: { fontFamily: 'NeoSansPro_Regular' },
});
