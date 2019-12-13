import React, { useState } from 'react';
import { StyleSheet, View, Picker, Button, TextInput } from 'react-native';

const HomeScreen = ({navigation}) => {

   const [summonerName, setSummonerName] = useState('')
   const [region, setRegion] = useState('BR')

   return (
      <View style = { styles.container }>
         <TextInput 
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={summonerName}
            onChangeText={(newValue) => setSummonerName(newValue)}/>
         <Picker 
            style = {styles.picker} 
            selectedValue = { region }
            onValueChange = {(newValue) => setRegion(newValue) } >
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
         <Button onPress = {() => { 
            navigation.navigate('Summoner', {
               summonerName: summonerName,
               region: region
            })
         }}
            title = 'Pesquisar'
            color = 'blue'/>
      </View>
   )
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

export default HomeScreen