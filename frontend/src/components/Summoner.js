import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const Summoner = ({summoner, version, children}) => {

    const cdn = 'http://ddragon.leagueoflegends.com/cdn'

    return (
        <View style={styles.container}>
            <Image style={styles.image} 
                source={{uri: `${cdn}/${version}/img/profileicon/${summoner.profileIconId}.png` }}/>
            <Text style={styles.name}>{summoner.name}</Text>
            <Text>Level: {summoner.summonerLevel}</Text>
            {children}
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
        height: 190,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 5
    },
    name: {
        textAlign: 'center'
    }
})

export default Summoner