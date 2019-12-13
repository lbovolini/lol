import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const League = ({league}) => {
    return (
        <View>
            <Text>{league.queueType }</Text>
            <Text>{league.tier} {league.rank} {league.leaguePoints} LP</Text>
            <Text>Wins: {league.wins} / Losses: {league.losses}</Text>
            <Text>WinRatio: {(100 * league.wins / (league.losses + league.wins)).toFixed(2)} %</Text>
        </View>
    )
}

const style = StyleSheet.create({

})

export default League