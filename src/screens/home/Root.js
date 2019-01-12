import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import Header from './Header';
import PieChartComp from './PieChartComp';
import TpsAcquisition from './TpsAcquisition';
import BrokenVote from './BrokenVote';

const Home = props => (
  <ScrollView style={styles.container}>
    <StatusBar
      translucent={false}
      backgroundColor="#27233A" />
    <Header {...props} />
    <PieChartComp />
    <TpsAcquisition />
    <BrokenVote />
  </ScrollView>
);

Home.navigatorStyle = {
  navBarHidden: true,
  statusBarColor: '#27233A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27233A',
    padding: 15,
  },


});

export default Home;
