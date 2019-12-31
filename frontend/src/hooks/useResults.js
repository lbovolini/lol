import { useState, useEffect } from 'react'
import lol from '../api/lol'
import ddragon from '../api/ddragon'

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
                                error: '',
                            })
        

    const searchApi = async (summonerName, region, update) => {
        try {
            const realm    = await ddragon.get(`/realms/${region.toLowerCase()}.json`)
            const version  = realm.data.v
            const language = realm.data.l
            const summoner = await ddragon.get(`/cdn/${version}/data/${language}/summoner.json`)
            const champion = await ddragon.get(`/cdn/${version}/data/${language}/champion.json`)
            const runes    = await ddragon.get(`/cdn/${version}/data/${language}/runesReforged.json`)
            const spells   = null
            const data     = await lol.get(`/${summonerName}/${region}/all.json?update=${update}`)

            setState({  version:  version,
                        language: language,
                        region:   region.toLowerCase(),
                        summoner: summoner.data.data,
                        champion: champion.data.data,
                        runes:    runes.data,
                        spells:   spells,
                        data:     data.data       
                    })

        } catch (err) {
            setState({...state, error: 'Something went wrong'})
        }
    }

    useEffect(() => {
        searchApi(summonerName, region, false)
    }, [])

    return { state, searchApi }

}