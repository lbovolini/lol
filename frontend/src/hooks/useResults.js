import { useState, useEffect } from 'react'
import lol from '../api/lol'
import ddragon from '../api/ddragon'

export default (summonerName, region) => {
    const [results, setResults] = useState(null)
    const [version, setVersion] = useState(null)
    const [champion, setChampion] = useState(null)
    const [summoner, setSummoner] = useState(null)
    const [rune, setRune] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const searchApi = async (summoner, region) => {
        try {
            const response = await lol.get(`/${summoner}/${region}/all.json`)
            setResults(response.data)
        } catch (err) {
            setErrorMessage('Something went wrong')
        }
    }

    const searchVersion = async (region) => {
        try {
            const response = await ddragon.get(`/realms/${region.toLowerCase()}.json`)
            setVersion(response.data.n)
            const champ = await ddragon.get(`/cdn/9.24.2/data/en_US/champion.json`)
            setChampion(champ.data.data)
            const summ = await ddragon.get(`/cdn/9.24.2/data/en_US/summoner.json`)
            setSummoner(summ.data.data)
            const r = await ddragon.get(`/cdn/9.24.2/data/en_US/runesReforged.json`)
            setRune(r.data)
        } catch (err) {
            setErrorMessage('Something went wrong')
        }
    }

    useEffect(() => {
        searchApi(summonerName, region)
        searchVersion(region)
    }, [])

    return [
        searchApi,
        results,
        version,
        champion,
        summoner,
        rune,
        errorMessage
    ]

}