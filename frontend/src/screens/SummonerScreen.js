import React, { useEffect } from 'react'
import { View, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, FlatList } from 'react-native'

import useResults from '../hooks/useResults'
import League from '../components/League'
import Match from '../components/Match'
import Summoner from '../components/Summoner'

const SummonerScreen = ({navigation}) => {

    const summonerName = navigation.getParam('summonerName', '')
    const region = navigation.getParam('region', '') 
    const state = useResults(summonerName, region)

    if (!state.data) {
        return <ActivityIndicator style={styles.indicator} size='large' color='#0000ff' />
    }

    const summoner = state.data.summoner
    const version  = state.version
    const league   = state.data.leagues.positionsSet
    const match    = state.data.history.matchHistoryList

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
                keyExtractor={(m) => m.id}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => 
                            navigation.navigate('MatchDetails', { 
                                match: item, index, state: state
                            })}>
                            <Match 
                                match={item} 
                                summonerId={summoner.id} 
                                state={state}
                            />
                        </TouchableOpacity>
                        )
                }}
            />
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    indicator: {
        flex: 1,
        justifyContent: 'center'
      },
})

export default SummonerScreen