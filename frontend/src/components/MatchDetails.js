import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import moment from 'moment'

const MatchDetails = ({match, summonerId, state}) => {

    const getMatchCreatedData = () => {
        return new Date(match.gameCreation).toDateString()
    }

    const getParticipantId = (summonerId) => {
        for(let i = 0; i < match.participantIdentities.length; i++) {
            if (match.participantIdentities[i].player.summonerId == summonerId) {
                return match.participantIdentities[i].participantId
            }
        }
    }
    
    const getParticipant = (participantId) => {
        for(let i = 0; i < match.participants.length; i++) {
            if (match.participants[i].participantId == participantId) {
                return match.participants[i]
            }
        }
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

    const getSummonerName = (summonerId) => {
        for(let i = 0; i < match.participantIdentities.length; i++) {
            if (match.participantIdentities[i].player.summonerId === summonerId) {
                return match.participantIdentities[i].player.summonerName
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
    const summonerName = getSummonerName(summonerId)

    const kills = participant.stats.kills
    const assists = participant.stats.assists
    const deaths = participant.stats.deaths

    const kda = getKDA()
    const level = getLevel()
    const goldEarned = getGoldEarned()
    const win = isWinner()
    const cs = getCreepScore()
    const csmin = getCreepScorePerMinute()
    const totalDamageDealtToChampions = getTotalDamageDealtToChampions()
    const totalDamageTaken = participant.stats.totalDamageTaken
    const wardsPlaced = participant.stats.wardsPlaced
    
    const { item0, item1, item2, item3, item4, item5, item6 } = participant.stats

    return(
        <View style={[styles.container, win ? styles.win : styles.lose]}>
            <View style={styles.icons}>
                <View style={styles.summonerName}>
                    <Text>{summonerName}</Text>
                </View>
                <Image style={styles.champion} 
                        source={{uri: championImg(participant.championId) }}/>
                <View style={styles.spells}>
                    <Image style={styles.spell} 
                            source={{uri: getSpellURI(participant.spell1Id) }}/>
                    <Image style={styles.spell} 
                            source={{uri: getSpellURI(participant.spell2Id) }}/>
                </View>
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
            <View style={styles.details}>
                    <View style={styles.headList}>
                        <Text>Kills</Text>
                        <Text>Deaths</Text>
                        <Text>Assists</Text>
                        <Text>KDA</Text>
                        <Text>CS</Text>
                        <Text>CS/min</Text>
                        <Text>Damage</Text>
                        <Text>Taken</Text>
                        <Text>Gold</Text>
                        <Text>Wards</Text>
                    </View>
                    <View style={styles.bodyList}>
                        <Text>{kills}</Text>
                        <Text>{deaths}</Text>
                        <Text>{assists}</Text>
                        <Text>{kda}</Text>
                        <Text>{cs}</Text>
                        <Text>{csmin}</Text>
                        <Text>{totalDamageDealtToChampions}</Text>
                        <Text>{totalDamageTaken}</Text>
                        <Text>{goldEarned}</Text>
                        <Text>{wardsPlaced}</Text>
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
        width: 200,
        justifyContent: 'center',
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
    summonerName: {
        width: 70,
        textAlign: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    champion: {
        width: 55,
        height: 55,
        borderRadius: 7,
        marginVertical: 10,
        marginLeft: 10
    },
    runes: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10
    },
    spells: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10
    },
    rune: {
        width: 25,
        height: 25,
        borderRadius: 7,
        backgroundColor: 'black',
        marginRight: 5
    },
    spell: {
        width: 25,
        height: 25,
        borderRadius: 7,
        backgroundColor: 'black',
        marginRight: 5
    },
    details: {
        flexDirection: 'row'
    },
    headList: {
        margin: 5
    },
    bodyList: {
        margin: 5
    }
})

export default MatchDetails