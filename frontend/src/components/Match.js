import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import moment from 'moment'

const Match = ({match, summonerId, state}) => {

    const getMatchCreatedData = () => {
        return new Date(match.gameCreation).toDateString()
    }

    const getParticipantId = (summonerId) => {
        return match.participantIdentities
            .filter((p) => p.player.summonerId === summonerId)[0].participantId
    }
    
    const getParticipant = (participantId) => {
        return match.participants.filter((p) => p.participantId === participantId)[0]
    }

    const getLevel = () => {
        return participant.stats.champLevel
    }

    const getKDA = () => {
        if (participant.stats.deaths > 0) {
            return ((participant.stats.assists + participant.stats.kills) / participant.stats.deaths).toFixed(2)
        } 
        return ((participant.stats.assists + participant.stats.kills) / 1).toFixed(2)
    }

    const getGoldEarned = () => {
        return participant.stats.goldEarned 
    }

    const isWinner = () => {
        return participant.stats.win
    }

    const getCreepScore = () => {
        return participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled
    }

    const getCreepScorePerMinute = () => {
        return (cs / (match.gameDuration / 60)).toFixed(2)
    }

    const getTotalDamageDealtToChampions = () => {
        return participant.stats.totalDamageDealtToChampions
    }

    const championImg = (championId) => {
        for (var key of Object.keys(champion)) {
            if (champion[key].key == championId) {
                return `${cdn}/${version}/img/champion/${key}.png`
            }
        } 
    }

    const getSpellURI = (spellId) => {
        for (var key of Object.keys(summoner)) {
            if (summoner[key].key == spellId) {
                return `${cdn}/${version}/img/spell/${key}.png`
            }
        } 
    }

    const getRune = (runeId) => {
        for(var key of Object.keys(runes)) {           
            if (runes[key].id == runeId) {
                return `${cdn}/img/${runes[key].icon}`       
            }
        }
    }

    const cdn = 'http://ddragon.leagueoflegends.com/cdn'

    const version  = state.version 
    const champion = state.champion 
    const summoner = state.summoner
    const runes    = state.runes 

    const created = getMatchCreatedData()
    const participantId = getParticipantId(summonerId)
    const participant = getParticipant(participantId)

    const kda = getKDA()
    const level = getLevel()
    const goldEarned = getGoldEarned()
    const win = isWinner()
    const cs = getCreepScore()
    const csmin = getCreepScorePerMinute()
    const totalDamageDealtToChampions = getTotalDamageDealtToChampions()
    
    const { item0, item1, item2, item3, item4, item5, item6 } = participant.stats

    return(
        <View style={[styles.container, win ? styles.win : styles.lose]}>
            <View style={styles.info}>
                <Text>{match.gameMode}</Text>
                <Text>{created}</Text>
                <Text>Duration: {(match.gameDuration / 60).toFixed(2)}</Text>
                <Text>KDA: {kda}</Text>
                <Text>CS/min: {csmin}</Text>
                <Text>Damage: {totalDamageDealtToChampions}</Text>
            </View>
            <View style={styles.icons}>
                <Image style={styles.champion} 
                        source={{uri: championImg(participant.championId) }}/>
                <View style={styles.runes}>
                    <Image style={styles.rune} 
                        source={{uri: getRune(participant.stats.perkPrimaryStyle) }}/>
                    <Image style={styles.rune} 
                        source={{uri: getRune(participant.stats.perkSubStyle) }}/>
                </View>
            </View>
            <View style={styles.icons}>
                <Image style={styles.icon} 
                        source={{uri: getSpellURI(participant.spell1Id) }}/>
                <Image style={styles.icon} 
                        source={{uri: getSpellURI(participant.spell2Id) }}/>
            </View>
            <View style={styles.icons}>
                <View style={styles.iconspart1}>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item0}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item1}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item2}.png` }}/>
                </View>
                <View style={styles.iconspart2}>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item3}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item4}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item5}.png` }}/>
                    <Image style={styles.icon} 
                        source={{uri: `${cdn}/${version}/img/item/${item6}.png` }}/>
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
    info: {
        width: 100
    },
    win: {
        backgroundColor: '#91bd3a'
    },
    lose: {
        backgroundColor: '#fa4252'
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius: 7,
        marginBottom: 5,
        backgroundColor: 'black',
        marginRight: 5
    },
    icons: {
        justifyContent: 'center',
    },
    iconspart1: {
        flexDirection: 'row',
    },
    iconspart2: {
        flexDirection: 'row',
    },
    champion: {
        width: 55,
        height: 55,
        borderRadius: 7,
        marginLeft: 10
    },
    runes: {
        flexDirection: 'row',
        margin: 10
    },
    rune: {
        width: 25,
        height: 25,
        borderRadius: 7,
        backgroundColor: 'black',
        marginRight: 5
    }
})

export default Match