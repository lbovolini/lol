import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const Summoner = ({summoner, version}) => {

    const cdn = 'http://ddragon.leagueoflegends.com/cdn'

    return (
        <View style={styles.container}>
            <Image style={styles.image} 
                source={{uri: `${cdn}/${version.profileicon}/img/profileicon/${summoner.profileIconId}.png` }}/>
            <Text>{summoner.name}</Text>
            <Text>Level: {summoner.summonerLevel}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        width: 120,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 4,
        marginBottom: 5
    },
})

export default Summoner