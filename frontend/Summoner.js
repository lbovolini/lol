import React from 'react'
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

/*const Summoner = (props) => {
   const goToHome = () => {
      Actions.home()
   }
   return (
         <Text>{ props.summoner }</Text>
   )
}*/

class Summoner extends React.Component {

    regex = /^[0-9\p{L} _\\.]+$/u

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            api: 'http://192.168.0.105:8080/api/v1',
            dd: 'http://ddragon.leagueoflegends.com',
            version: null
        }
    }


    componentDidMount() {
        let summoner = fetch(`${this.state.api}/${this.props.summoner}/${this.props.region}/all.json`)
        let realms = fetch(`${this.state.dd}/realms/br.json`)

        Promise.all([summoner, realms])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson[0],
                    version: responseJson[1]
                })
            }).catch((error) => console.error(error))
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style = { styles.container }>
                    <ActivityIndicator/>
                </View>
            )
        }
        else {
            const summoner = this.state.dataSource.summoner
            const leagues = this.state.dataSource.leagues
            const history = this.state.dataSource.history
            const version = this.state.version.n
            return (
                <View style = { styles.container }>
                    <Text>{ summoner.profileIconId }</Text>
                    <Text>{ summoner.name }</Text>
                    <Text>{ summoner.summonerLevel }</Text>
                    <Text>{ version.summoner }</Text>
                    <Image source = {{ uri: `${this.state.dd}/cdn/${version.profileicon}/img/profileicon/${summoner.profileIconId}.png` }}
                           style = { styles.profileIcon }/>

                    {leagues.map(league => {
                        if (league.queueType == 'RANKED_SOLO_5x5') {
                            return <Text key={league.leagueId}>Ranqueada Solo</Text>
                        }
                    })}               
             
                    {history.map(match => {
                        return (<Text key={match.gameId}>{match.gameMode}</Text>)
                    })}
                    
                </View>
            );
        }
    }
}

export default Summoner

const styles = StyleSheet.create({
    container: {
        height: 600,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
        width: 48,
        height: 48
    }
})