import React, { useEffect } from 'react'
import { View, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, FlatList, Button } from 'react-native'

import useResults from '../hooks/useResults'
import League from '../components/League'
import Match from '../components/Match'
import Summoner from '../components/Summoner'

const SummonerScreen = ({navigation}) => {

    const summonerName = navigation.getParam('summonerName', '')
    const region = navigation.getParam('region', '') 
    const { state, searchApi } = useResults(summonerName, region)

    if (!state.data) {
        return <ActivityIndicator style={styles.indicator} size='large' color='#0000ff' />
    }

    const summoner = state.data.summoner
    const version  = state.version
    const league   = state.data.leagues.positionsSet
    const match    = state.history

    return (
        <>
            <FlatList
                data={match}
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
                ListHeaderComponent={
                    <View style={styles.container}>
                        <Summoner summoner={summoner} version={version}>
                            <View>
                                <Button title="Update" onPress={() => searchApi(summonerName, region, true)}/>
                            </View>
                        </Summoner>                
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={league.sort((a, b) => b.queueType.localeCompare(a.queueType))}
                            keyExtractor={(result) => result.id}
                            renderItem={({item}) => {
                                return <League league={item} />
                            }}
                        />
                    </View>
                }
                onEndReached={() => searchApi(summonerName, region, false)}
                onEndReachedThreshold={0.1}
            />
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