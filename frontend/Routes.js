import React from 'react'
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home.js'
import Summoner from './Summoner.js'

const Routes = () => (
   <Router>
      <Scene key = "root" titleStyle = { styles.header }>
         <Scene key = "home" component = {Home} title = "My League" initial = {true} />
         <Scene key = "summoner" component = {Summoner} title = "Summoner" />
      </Scene>
   </Router>
)
export default Routes

const styles = StyleSheet.create({
    header: {
        flex: 1,
        textAlign: 'center'
    }
})