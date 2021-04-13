import React, { useEffect, useState } from 'react'
import { Space, Card, Spin, Alert } from 'antd'

const Loading = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                marginTop: '50vh',
                transform: 'translateY(-50%)',
            }}
        >
            <Spin size="large" tip={'Chargement...'} />
        </div>
    )
}

const Error = (error) => {
    console.log(error)
    return (
        <div
            style={{
                textAlign: 'center',
                marginTop: '50vh',
                transform: 'translateY(-50%)',
            }}
        >
            <Alert
                message={'Erreur'}
                type="error"
                description={
                    "Il semblerait qu'une erreur soit survenue côté serveur."
                }
            />
        </div>
    )
}

const DashboardScreen = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!data && loading && !error)
            fetch(window.location.hostname + '/')
                .then((response) => response.json())
                .catch((e) => setError(e))
                .then((files) => {
                    setData(files)
                    setLoading(false)
                })
    }, [])

    if (error) return <Error error />

    if (loading) return <Loading />

    return <div className="homecontainer"></div>
}

export default DashboardScreen
