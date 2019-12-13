import { useState, useEffect } from 'react'
import lol from '../api/lol'

export default (summonerName, region) => {
    const [results, setResults] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const searchApi = async (summoner, region) => {
        try {
            const response = await lol.get(`/${summoner}/${region}/all.json`)
            setResults(response.data)
        } catch (err) {
            setErrorMessage('Something went wrong')
        }
    }

    useEffect(() => {
        searchApi(summonerName, region)
    }, [])

    return [
        searchApi,
        results,
        errorMessage
    ]

}