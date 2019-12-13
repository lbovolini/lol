import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, Image, StyleSheet, FlatList } from 'react-native'

import useResults from '../hooks/useResults'
import League from '../components/League'

const SummonerScreen = ({navigation}) => {

    const summonerName = navigation.getParam('summonerName', '')
    const region = navigation.getParam('region', '') 
    const [searchApi, results, errorMessage] = useResults(summonerName, region)

    if (!results) {
        return <ActivityIndicator style={styles.indicator} size='large' color='#0000ff' />
    }

    const summoner = results.summoner
    const league = results.leagues.positionsSet
    const match = results.history.matchList

    return (
        <View>
            <Text>{summoner.name}</Text>
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
    )
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center'
      },
})

export default SummonerScreen