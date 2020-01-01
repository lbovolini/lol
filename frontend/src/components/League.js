import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const League = ({league}) => {

    const getQueueType = () => {
        if (league.queueType === 'RANKED_SOLO_5x5') {
            return 'Ranked Solo'
        } else if (league.queueType === 'RANKED_FLEX_SR') {
            return 'Ranked Flex'
        }
        return 'Ranked'
    }
    
    const queue = getQueueType()
    const tierIconPath = '../../assets/ranked-emblems'
    const tier = league.tier

    switch (tier) {
        case 'IRON':
            uri = require(`${tierIconPath}/Emblem_Iron.png`)
            break
        case 'BRONZE':
            uri = require(`${tierIconPath}/Emblem_Bronze.png`)
            break
        case 'SILVER':
            uri = require(`${tierIconPath}/Emblem_Silver.png`)
            break
        case 'GOLD':
            uri = require(`${tierIconPath}/Emblem_Gold.png`)
            break
        case 'PLATINUM':
            uri = require(`${tierIconPath}/Emblem_Platinum.png`)
            break
        case 'DIAMOND':
            uri = require(`${tierIconPath}/Emblem_Diamond.png`)
            break
        case 'MASTER':
            uri = require(`${tierIconPath}/Emblem_Master.png`)
            break
        case 'GRANDMASTER':
            uri = require(`${tierIconPath}/Emblem_Grandmaster.png`)
            break
        case 'CHALLENGER':
            uri = require(`${tierIconPath}/Emblem_Challenger.png`)
            break
    }

    return (
        <View style={styles.container}>
            <Text>{queue}</Text>
            <Image style={styles.image} 
                source={uri}/>

            <Text>{league.tier} {league.rank} {league.leaguePoints} LP</Text>
            <Text>Wins: {league.wins} / Losses: {league.losses}</Text>
            <Text>WinRatio: {(100 * league.wins / (league.losses + league.wins)).toFixed(2)} %</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginLeft: 0,
        height: 160,
        width: 200,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        height: 180,
        paddingTop: 10
    },
    image: {
        width: 64,
        height: 73,
        borderRadius: 4,
        marginBottom: 5
    },
})

export default League