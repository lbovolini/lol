import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

class SummonerPicker extends Component {
    state = { summoner: '' }
    updateSummoner = (summoner) => {
        this.setState({ summoner: summoner })
    }
    render() {
        return (
           <View>
              <Picker selectedValue = {this.state.summoner} onValueChange = {this.updateSummoner}>
                 <Picker.Item label = "Brasil" value = "br" />
                 <Picker.Item label = "EUNE" value = "eune" />
                 <Picker.Item label = "EUW" value = "euw" />
              </Picker>
              <Text style = {styles.text}>{this.state.summoner}</Text>
           </View>
        )
     }
}

export default SummonerPicker

const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    }
 })