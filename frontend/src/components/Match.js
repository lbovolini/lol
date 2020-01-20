import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Match = ({match, summonerId, state}) => {

    const getMatchCreatedData = () => {
        return new Date(match.gameCreation).toLocaleDateString()
    }

    const getDuration = () => {
        const min = Math.floor(match.gameDuration / 60)
        let sec = match.gameDuration % 60

        if (sec < 10) {
            sec = '0' + sec
        }

        return `${min}:${sec}`
    }

    const getParticipantId = (summonerId) => {
        return match.participantIdentities
            .filter((p) => p.summoner.id == summonerId)[0].participantId
    }
    
    const getParticipant = (participantId) => {
        return match.participants.filter((p) => p.participantId == participantId)[0]
    }

    const getLevel = () => {
        return participant.champLevel
    }

    const getKDA = () => {
        if (participant.deaths > 0) {
            return ((participant.assists + participant.kills) / participant.deaths).toFixed(2)
        } 
        return ((participant.assists + participant.kills) / 1).toFixed(2)
    }

    const getGoldEarned = () => {
        return participant.goldEarned 
    }

    const isWinner = () => {
        return participant.win
    }

    const getCreepScore = () => {
        return participant.totalMinionsKilled + participant.neutralMinionsKilled
    }

    const getCreepScorePerMinute = () => {
        return (cs / (match.gameDuration / 60)).toFixed(2)
    }

    const getTotalDamageDealtToChampions = () => {
        return participant.totalDamageDealtToChampions
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
    const duration = getDuration()
    const participantId = getParticipantId(summonerId)
    const participant = getParticipant(participantId)

    const kda = getKDA()
    const level = getLevel()
    const goldEarned = getGoldEarned()
    const win = isWinner()
    const cs = getCreepScore()
    const csmin = getCreepScorePerMinute()
    const totalDamageDealtToChampions = getTotalDamageDealtToChampions()
    
    const { item0, item1, item2, item3, item4, item5, item6 } = participant

    return(
        <View style={[styles.container, win ? styles.win : styles.lose]}>
            <View style={styles.info}>
                <Text>{match.gameMode}</Text>
                <Text>{created}</Text>
                <Text>{duration}</Text>
            </View>
            <View style={styles.icons}>
                <Image style={styles.champion} 
                        source={{uri: championImg(participant.championId) }}/>
            </View>
            <View style={styles.icons}>
                <Image style={styles.icon} 
                    source={{uri: `${cdn}/${version}/img/item/${item0}.png` }}/>
                <Image style={styles.icon} 
                    source={{uri: `${cdn}/${version}/img/item/${item1}.png` }}/>
                <Image style={styles.icon} 
                    source={{uri: `${cdn}/${version}/img/item/${item2}.png` }}/>
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
        width: 70,
        alignSelf: 'center'
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    champion: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10
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
