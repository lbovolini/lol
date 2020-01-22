import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MatchDetails from '../components/MatchDetails'

const MatchDetailsScreen = ({navigation}) => {

    const match = navigation.getParam('match', '')
    const state = navigation.getParam('state', '')
    const index = navigation.getParam('index', '')

    const data = state.history[index].participantIdentities

    return (
        <>
            <FlatList
                data={data.sort((a, b) => a.participantId - b.participantId)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(p) => p.participantId}
                renderItem={({item}) => {
                    return (
                        <MatchDetails 
                            match={match} 
                            summonerId={item.summoner.id} 
                            state={state}
                        />
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({

})

export default MatchDetailsScreen