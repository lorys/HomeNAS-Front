import React, { useEffect, useState } from 'react'
import { Tabs, Input, Space, Progress, Statistic } from 'antd'
import {
    SettingTwoTone,
    HomeTwoTone,
    LockTwoTone,
    FolderOpenTwoTone,
} from '@ant-design/icons'
import {
    Error,
    Loading,
    Configuration,
    PrivateStorage,
    PublicStorage,
} from '../components'

const { TabPane } = Tabs
const { Search } = Input

const TabBar = () => {
    const addAFolder = (
        <TabPane
            tab={
                <span style={{ width: 50 }}>
                    <SettingTwoTone />
                    Configuration
                </span>
            }
            key={'config'}
        >
            <Configuration />
        </TabPane>
    )

    const Home = (
        <TabPane
            tab={
                <span style={{ width: 50 }}>
                    <HomeTwoTone />
                    Accueil
                </span>
            }
            key={'home'}
        >
            <Space>
                <div className={'widget'}>
                    <Progress type="circle" percent={75} />
                    <h2 style={{ textAlign: 'center' }}>Stockage</h2>
                </div>
                <div className={'widget'}>
                    <Statistic title="Fichiers" value={112893} />
                </div>
                <div className={'widget'}>
                    <Statistic title="Go utilisé" value={548} />
                </div>
                <div className={'widget'}>
                    <Statistic title="Go libres" value={2048 - 548} />
                </div>
            </Space>
        </TabPane>
    )
    const privateDirs = (
        <TabPane
            tab={
                <span>
                    <LockTwoTone />
                    Stockage privé
                </span>
            }
            key={'privateDirs'}
        >
            <PrivateStorage />
        </TabPane>
    )
    const publicDirs = (
        <TabPane
            tab={
                <span>
                    <FolderOpenTwoTone />
                    Stockage Commun
                </span>
            }
            key={'publicDirs'}
        >
            <PublicStorage />
        </TabPane>
    )
    return <Tabs>{[Home, publicDirs, privateDirs, addAFolder]}</Tabs>
}

const DashboardScreen = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!data && loading && !error) {
            fetch('api/home')
                .then((response) => response.json())
                .catch((e) => setError(e))
                .then((files) => {
                    setData(files)
                    setLoading(false)
                })
        }
    }, [])

    if (error)
        return (
            <div style={{ width: '100vw', height: '100vh', margin: 0 }}>
                <Error error />
            </div>
        )

    if (loading) return <Loading />

    return (
        <div className={'container'}>
            <div className="homecontainer">
                <Search
                    placeholder="Recherche"
                    enterButton="Search"
                    size="large"
                    // loading
                />
                <TabBar />
            </div>
        </div>
    )
}

export default DashboardScreen
