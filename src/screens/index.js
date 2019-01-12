import { Navigation } from 'react-native-navigation';

import Home from './home/Root';
import Login from './login/Login';

export const registerScreens = function registerScreens() {
  Navigation.registerComponent('screen.Home', () => Home);
  Navigation.registerComponent('screen.Login', () => Login);
};

export default registerScreens;
