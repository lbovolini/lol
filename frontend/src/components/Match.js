import React from 'react'
import { View, Text } from 'react-native'


const Match = props => {
    return(
        <View>
            <Text>{props.match.gameMode}</Text>
        </View>
    )
}

export default Match