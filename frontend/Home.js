import React from 'react';
import { StyleSheet, View, Picker, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
   state = {
      summoner: '',
      region: 'br1',
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
               <Picker.Item label = 'Brasil' value = 'br'/>
               <Picker.Item label = 'EUNE' value = 'eune'/>
               <Picker.Item label = 'EUW' value = 'euw'/>
               <Picker.Item label = 'Japan' value = 'jp'/>
               <Picker.Item label = 'Korea' value = 'kr'/>
               <Picker.Item label = 'LAN' value = 'lan'/>
               <Picker.Item label = 'LAS' value = 'las'/>
               <Picker.Item label = 'North America' value = 'na'/>
               <Picker.Item label = 'OCE' value = 'oce'/>
               <Picker.Item label = 'TR' value = 'TR'/>
               <Picker.Item label = 'RU' value = 'ru'/>
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