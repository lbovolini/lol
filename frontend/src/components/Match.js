import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import moment from 'moment'

const Match = ({match, summonerId, version, champion, summ}) => {

    const cdn = 'http://ddragon.leagueoflegends.com/cdn'

    const created = new Date(match.gameCreation).toDateString()

    const participantId = match.participantIdentities.filter((p) => p.player.summonerId === summonerId)[0].participantId
    const participant = match.participants.filter((p) => p.participantId === participantId)[0]

    let kda
    if (participant.stats.deaths > 0) {
        kda = ((participant.stats.assists + participant.stats.kills) / participant.stats.deaths).toFixed(2)
    } else {
        kda = ((participant.stats.assists + participant.stats.kills) / 1).toFixed(2)
    }

    const level = participant.stats.champLevel
    const goldEarned = participant.stats.goldEarned 
    // boolean
    const win = participant.stats.win
    const cs = participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled
    const totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions
    const csmin = (cs / (match.gameDuration / 60)).toFixed(2)

    const {item0, item1, item2, item3, item4, item5, item6} = participant.stats

    

    const championImg = (championId) => {
        for (var key of Object.keys(champion)) {
            if (champion[key].key == championId) {
                return `http://ddragon.leagueoflegends.com/cdn/${version.champion}/img/champion/${key}.png`
            }
        } 
    }

    const getSpellURI = (spellId) => {
        for (var key of Object.keys(summ)) {
            if (summ[key].key == spellId) {
                console.log(`http://ddragon.leagueoflegends.com/cdn/${version.summoner}/img/spell/${key}.png`)
                return `http://ddragon.leagueoflegends.com/cdn/${version.summoner}/img/spell/${key}.png`
            }
        } 
    }

    return(
        <View style={[styles.container, win ? styles.win : styles.lose]}>
            <View>
                <Text>{match.gameMode}</Text>
                <Text>{created}</Text>
                <Text>Duration: {(match.gameDuration / 60).toFixed(2)}</Text>
                <Text>KDA: {kda}</Text>
                <Text>Level: {level}</Text>
                <Text>Gold: {goldEarned}</Text>
                <Text>CS: {cs}</Text>
                <Text>CS/min: {csmin}</Text>
                <Text>Damage: {totalDamageDealtToChampions}</Text>
            </View>
            <View style={styles.icons}>
                <Image style={styles.champion} 
                        source={{uri: championImg(participant.championId) }}/>
                <Image style={styles.champion} 
                        source={{uri: getSpellURI(participant.spell1Id) }}/>
                <Image style={styles.champion} 
                        source={{uri: getSpellURI(participant.spell2Id) }}/>
            </View>
            <View style={styles.icons}>
                <View style={styles.iconspart1}>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item0}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item1}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item2}.png` }}/>
                </View>
                <View style={styles.iconspart2}>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item3}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item4}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item5}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version.item}/img/item/${item6}.png` }}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'row'
    },
    win: {
        backgroundColor: '#50d890'
    },
    lose: {
        backgroundColor: '#f6c3e5'
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 7,
        marginBottom: 5
    },
    icons: {
        justifyContent: 'center',
        padding: 10
    },
    iconspart1: {
        flexDirection: 'row',
    },
    iconspart2: {
        flexDirection: 'row',
    },
    champion: {
        width: 48,
        height: 48,
        borderRadius: 7,
        marginBottom: 5
    }
})

export default Match