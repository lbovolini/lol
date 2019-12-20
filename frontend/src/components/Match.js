import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Match = ({match, summonerId, version}) => {

    const cdn = 'http://ddragon.leagueoflegends.com/cdn'

    const participantId = match.participantIdentities.filter((p) => p.player.summonerId === summonerId)[0].participantId
    const participant = match.participants.filter((p) => p.participantId === participantId)[0]

    let kda
    if (participant.stats.deaths > 0) {
        kda = (participant.stats.assists + participant.stats.kills) / participant.stats.deaths
    } else {
        kda = (participant.stats.assists + participant.stats.kills) / 1
    }

    const level = participant.stats.champLevel
    const goldEarned = participant.stats.goldEarned 
    // boolean
    const win = participant.stats.win
    const cs = participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled
    const totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions
    const csmin = cs / (match.gameDuration / 60)

    return(
        <View style={[styles.container, win ? styles.win : styles.lose]}>
            <Text>{match.gameMode}</Text>
            <Text>{match.gameCreation}</Text>
            <Text>Duration: {(match.gameDuration / 60).toFixed(2)}</Text>
            <Text>{participant.championId}</Text>
            <Text>KDA: {kda}</Text>
            <Text>Level: {level}</Text>
            <Text>Gold: {goldEarned}</Text>
            <Text>CS: {cs}</Text>
            <Text>CS/min: {csmin}</Text>
            <Text>Damage: {totalDamageDealtToChampions}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10
    },
    win: {
        backgroundColor: 'green'
    },
    lose: {
        backgroundColor: 'red'
    }
})

export default Match