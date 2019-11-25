import React from 'react';
import { StyleSheet, View, Picker, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
   state = {
      summoner: '',
      region: 'br',
   }
   updateSummoner = (summoner) => {
      this.setState({ summoner: summoner })
   }
   updateRegion = (region) => {
      this.setState({ region: region })
   }
   handleButtonPress = () => {
      Actions.summoner({ summoner: this.state.summoner, region: this.state.region })
   }
   render() {
      return (
         <View style = { styles.container }>
            <TextInput style = { styles.input }
               onChangeText = { this.updateSummoner }/>
            <Picker style = { styles.picker } selectedValue = { this.state.region }
               onValueChange = { this.updateRegion } >
               <Picker.Item label = 'Brasil' value = 'BR'/>
               <Picker.Item label = 'EUNE' value = 'EUNE'/>
               <Picker.Item label = 'EUW' value = 'EUW'/>
               <Picker.Item label = 'Japan' value = 'JP'/>
               <Picker.Item label = 'Korea' value = 'KR'/>
               <Picker.Item label = 'LAN' value = 'LAN'/>
               <Picker.Item label = 'LAS' value = 'LAS'/>
               <Picker.Item label = 'North America' value = 'NA'/>
               <Picker.Item label = 'OCE' value = 'OCE'/>
               <Picker.Item label = 'TR' value = 'TR'/>
               <Picker.Item label = 'RU' value = 'RU'/>
            </Picker>
            <Button onPress = { this.handleButtonPress }
               title = 'Pesquisar'
               color = 'blue'/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      height: 600,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontSize: 22,
      alignSelf: 'center',
      color: 'red'
   },
   input: {
      fontSize: 22,
      margin: 15,
      height: 40,
      width: 300,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   picker: {
      width: 300
   }
})