import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './src/screens/HomeScreen'
import SummonerScreen from './src/screens/SummonerScreen'
import MatchDetailsScreen from './src/screens/MatchDetailsScreen'

const navigator = createStackNavigator(
   {
      Home: HomeScreen,
      Summoner: SummonerScreen,
      MatchDetails: MatchDetailsScreen,
   },
   {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
         title: 'App'
      }
   }
)

export default createAppContainer(navigator);