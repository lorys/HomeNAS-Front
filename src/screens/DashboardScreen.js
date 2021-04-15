import React, { useEffect, useState } from 'react'
import { Spin, Alert, Select, Collapse, Tabs, Input, Button, Space } from 'antd'
import { SettingTwoTone, UserOutlined, HomeTwoTone } from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input
const { Panel } = Collapse
const { Option } = Select

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

const AddCategory = () => {
    return (
        <Collapse defaultActiveKey={['0']}>
            <Panel header="Ajouter un dossier" key="0">
                <div style={{ width: '50%' }}>
                    <p>
                        Pour ajouter un dossier, veuillez renseigner le type de
                        fichier qu'il contiendra :
                    </p>
                    <Select defaultValue="video" style={{ width: '100%' }}>
                        <Option value="video">Vidéos/Films</Option>
                        <Option value="photos">Photos</Option>
                        <Option value="docs">Documents</Option>
                    </Select>
                    <p style={{ marginTop: 20 }}>Entrez le nom du dossier :</p>
                    <Input placeholder={'Nom du nouveau dossier'} />
                    <Button style={{ marginTop: 20 }} type={'primary'}>
                        Enregistrer
                    </Button>
                </div>
            </Panel>
            <Panel header="Ajouter une personne" key="1">
                <div style={{ width: '50%' }}>
                    <p>Entrez le nom de la personne à ajouter :</p>
                    <Input placeholder={'Nom de la nouvelle personne'} />
                    <Button style={{ marginTop: 20 }} type={'primary'}>
                        Enregistrer
                    </Button>
                </div>
            </Panel>
        </Collapse>
    )
}

const TabBar = ({ userList, folderList }) => {
    const users = userList.map((item, index) => (
        <TabPane
            tab={
                <span>
                    <UserOutlined />
                    {item}
                </span>
            }
            key={index + '_users'}
        ></TabPane>
    ))
    const folders = folderList.map((item, index) => (
        <TabPane tab={item} key={index + '_folders'}></TabPane>
    ))
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
            <AddCategory />
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
                <div className={'widget'}></div>
            </Space>
        </TabPane>
    )
    return <Tabs>{[Home, addAFolder, ...folders, ...users]}</Tabs>
}

const DashboardScreen = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log(data)
        if (!data && loading && !error) {
            setData({
                users: ['lorys', 'matteo', 'maxime', 'valerie'],
                folders: ['films', 'photos'],
            })
            setLoading(false)
            return () => {}
            fetch('api/root')
                .then((response) => response.json())
                .catch((e) => setError(e))
                .then((files) => {
                    setData(files)
                    setLoading(false)
                })
        }
    }, [])

    if (error) return <Error error />

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
                <TabBar userList={data.users} folderList={data.folders} />
            </div>
        </div>
    )
}

export default DashboardScreen
