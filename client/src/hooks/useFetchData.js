import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchData = (initialUrl, initialData, requestOptions = {}) => {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {

      const result = await axios(url, requestOptions)
      setData(result.data)

      } catch(err) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  },[url])

  return [{ data, isLoading, isError}, setUrl ]
}

export default useFetchData