import { useState, useEffect } from 'react'
import lol from '../api/lol'
import ddragon from '../api/ddragon'
import axios from 'axios'

import { BASE_URL } from 'react-native-dotenv'
import { PASSWORD } from 'react-native-dotenv'

export default (summonerName, region) => {

    const [state, setState] = useState({
                                version: '',
                                language: '',
                                region: '',
                                summoner: null,
                                champion: null,
                                runes: null,
                                spells: null,
                                data: null,
                                history: [],
                                page: 0,
                                error: '',
                            })
        

    const login = (summonerName, region, update) => {
        try {
            const user = {"username": "admin", "password": PASSWORD}
            fetch(`${BASE_URL}/login`, {    
                method: 'POST',    
                body: JSON.stringify(user)    
            }).then(res => {
                const jwtToken = res.headers.get('Authorization');    
                if (jwtToken !== null) {    
                    axios.defaults.headers.common['Authorization'] = jwtToken
                }
            }).then(() => searchApi(summonerName, region, update))
            .catch((error) => console.log(error))
        } catch (err) {
            console.log(err)
        }
    }

    const searchApi = async (summonerName, region, update) => {
        try {

           
           

            const realm    = await ddragon.get(`/realms/${region.toLowerCase()}.json`)
            const version  = realm.data.v
            const language = realm.data.l
            const summoner = await ddragon.get(`/cdn/${version}/data/${language}/summoner.json`)
            const champion = await ddragon.get(`/cdn/${version}/data/${language}/champion.json`)
            const runes    = await ddragon.get(`/cdn/${version}/data/${language}/runesReforged.json`)
            const spells   = null
            const { page } = state
            const data     = await axios.get(`${BASE_URL}/api/v1/${summonerName}/${region}/all.json?update=${update}&page=${page}`)

            if (!update) {
            setState({  version:  version,
                        language: language,
                        region:   region.toLowerCase(),
                        summoner: summoner.data.data,
                        champion: champion.data.data,
                        runes:    runes.data,
                        spells:   spells,
                        data:     data.data,
                        history: [...state.history, ...data.data.history.matchHistoryList],
                        page: page + 1,
                    })
                } else {
                    setState({  version:  version,
                        language: language,
                        region:   region.toLowerCase(),
                        summoner: summoner.data.data,
                        champion: champion.data.data,
                        runes:    runes.data,
                        spells:   spells,
                        data:     data.data,
                        history: data.data.history.matchHistoryList,
                        page: page + 1,
                    })
                }

        } catch (err) {
            console.log(err)
            setState({...state, error: 'Something went wrong'})
        }
    }

    useEffect(() => {
        login(summonerName, region, false)
    }, [])

    return { state, searchApi }

}