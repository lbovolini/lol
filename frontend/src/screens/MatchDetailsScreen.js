import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MatchDetails from '../components/MatchDetails'

const MatchDetailsScreen = ({navigation}) => {

    const match = navigation.getParam('match', '')
    const state = navigation.getParam('state', '')

    const data = state.data.history.matchList[0].participantIdentities

    return (
        <>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(p) => p.participantId}
                renderItem={({item}) => {
                    return (
                        <MatchDetails 
                            match={match} 
                            summonerId={item.player.summonerId} 
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