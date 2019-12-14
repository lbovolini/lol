import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Match = ({match}) => {
    return(
        <View style={styles.container}>
            <Text>{match.gameMode}</Text>
            <Text>{match.gameCreation}</Text>
            <Text>{match.gameDuration}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default Match