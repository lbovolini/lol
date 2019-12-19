import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, FlatList } from 'react-native'

import useResults from '../hooks/useResults'
import League from '../components/League'
import Match from '../components/Match'
import Summoner from '../components/Summoner'

const SummonerScreen = ({navigation}) => {

    const summonerName = navigation.getParam('summonerName', '')
    const region = navigation.getParam('region', '') 
    const [searchApi, results, version, errorMessage] = useResults(summonerName, region)

    if (!results) {
        return <ActivityIndicator style={styles.indicator} size='large' color='#0000ff' />
    }

    const summoner = results.summoner
    const league = results.leagues.positionsSet
    const match = results.history.matchList
    
    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Summoner summoner={summoner} version={version} />
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={league}
                    keyExtractor={(result) => result.leagueId}
                    renderItem={({item}) => {
                        return <League league={item} />
                    }}
                />
            </View>
            <FlatList
                data={match}
                showsVerticalScrollIndicator={false}
                keyExtractor={(m) => m.gameId}
                renderItem={({item}) => {
                    return <Match match={item} />
                }}
            />
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    indicator: {
        flex: 1,
        justifyContent: 'center'
      },
})

export default SummonerScreen