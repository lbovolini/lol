import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './src/screens/HomeScreen'
import SummonerScreen from './src/screens/SummonerScreen'

const navigator = createStackNavigator(
   {
      Home: HomeScreen,
      Summoner: SummonerScreen,
   },
   {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
         title: 'App'
      }
   }
)

export default createAppContainer(navigator);