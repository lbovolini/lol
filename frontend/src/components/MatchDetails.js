import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const MatchDetails = ({match, summonerId, state}) => {

    const getMatchCreatedData = () => {
        return new Date(match.gameCreation).toDateString()
    }

    const getParticipantId = (summonerId) => {
        for(let i = 0; i < match.participantIdentities.length; i++) {
            if (match.participantIdentities[i].summoner.id == summonerId) {
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

        for (let i = 0; i < state.runes.length; i++) {
            for (let j = 0; j < state.runes[i].slots.length; j++) {
                for (let k = 0; k < state.runes[i].slots[j].runes.length; k++) {
                    if (state.runes[i].slots[j].runes[k].id === runeId) {
                        return `${cdn}/img/${state.runes[i].slots[j].runes[k].icon}`
                    }
                }
            }
        }
    }

    const getSummonerName = (summonerId) => {
        for(let i = 0; i < match.participantIdentities.length; i++) {
            if (match.participantIdentities[i].summoner.id === summonerId) {
                return match.participantIdentities[i].summoner.name
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

    const kills = participant.kills
    const assists = participant.assists
    const deaths = participant.deaths

    const kda = getKDA()
    const level = getLevel()
    const goldEarned = getGoldEarned()
    const win = isWinner()
    const cs = getCreepScore()
    const csmin = getCreepScorePerMinute()
    const totalDamageDealtToChampions = getTotalDamageDealtToChampions()
    const totalDamageTaken = participant.totalDamageTaken
    const wardsPlaced = participant.wardsPlaced
    
    const { item0, item1, item2, item3, item4, item5, item6 } = participant
    const { perk0, perk1, perk2, perk3, perk4, perk5 } = participant
    const { statPerk0, statPerk1, statPerk2 } = participant

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
            <View style={styles.runes}>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk0) }}/>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk1) }}/>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk2) }}/>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk3) }}/>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk4) }}/>
                <Image style={styles.rune} 
                    source={{uri: getRune(perk5) }}/>
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
        justifyContent: 'center',
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
        marginBottom: 5,
        backgroundColor: 'black',
    },
    spell: {
        width: 25,
        height: 25,
        borderRadius: 7,
        backgroundColor: 'black',
        marginRight: 5
    },
    details: {
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    headList: {
        margin: 5
    },
    bodyList: {
        width: 50,
        margin: 5,
        alignItems: 'flex-end'
    }
})

export default MatchDetails
