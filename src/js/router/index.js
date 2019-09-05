/**
 * @format
 */

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import Login from '../pages/Login';
import Home from '../pages/Home';
import SingleSelect from '../pages/SingleSelect';
import MultiSelect from '../pages/MultiSelect';

const AppStack = createStackNavigator(
  {
    Home: Home,
    SingleSelect,
    MultiSelect,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: true,
    },
    headerLayoutPreset: 'center',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Login: Login,
    AppStack: AppStack,
  },
  {
    initialRouteName: 'Login',
  },
);

export const AppContainer = createAppContainer(AppNavigator);
