import React, { useEffect, useState } from 'react'
import {
    Carousel,
    Spin,
    Alert,
    Select,
    Collapse,
    Tabs,
    Input,
    Button,
    Space,
    Table,
    Breadcrumb,
    Progress,
    Statistic,
} from 'antd'
import {
    SettingTwoTone,
    UserOutlined,
    HomeTwoTone,
    LockTwoTone,
    FolderOpenTwoTone,
    FolderAddTwoTone,
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input
const { Panel } = Collapse
const { Option } = Select

const Loading = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                paddingTop: '20%',
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
                marginTop: '50%',
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

const DirList = ({ list, callback, path, setPath }) => {
    return (
        <div className={'dirlist'}>
            {path !== '' && path !== '/' ? (
                <div
                    className={'dirlistitem'}
                    onClick={() => {
                        setPath(
                            path
                                .split('/')
                                .filter((a) => a !== '')
                                .slice(0, -1)
                                .join('/')
                        )
                    }}
                >
                    <Space align={'center'}>
                        <FolderOpenTwoTone style={{ fontSize: 30 }} />
                        <span style={{ fontSize: 15, marginLeft: 20 }}>
                            ...
                        </span>
                    </Space>
                </div>
            ) : null}
            {list.map((item) => (
                <div className={'dirlistitem'} onClick={() => callback(item)}>
                    <Space align={'center'}>
                        <FolderOpenTwoTone style={{ fontSize: 30 }} />
                        <span style={{ fontSize: 15, marginLeft: 20 }}>
                            {item.name}
                        </span>
                    </Space>
                </div>
            ))}
            <div className={'dirlistitem'} onClick={() => callback()}>
                <Space align={'center'}>
                    <FolderAddTwoTone style={{ fontSize: 30 }} />
                    <span style={{ fontSize: 15, marginLeft: 20 }}>
                        Créer un nouveau dossier
                    </span>
                </Space>
            </div>
        </div>
    )
}

const PublicStorage = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState('/')

    useEffect(() => {
        fetch('/api/public/' + path)
            .then((response) => response.json())
            .catch((e) => setError(e))
            .then((e) => {
                setData(e)
                setLoading(false)
            })
    }, [path])

    if (loading) return <Loading />
    if (error) return <Error error />

    const BreadcrumbItems = ({ path, setPath }) => {
        if (!path)
            return (
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <span
                            className={'breadcrumblink'}
                            onClick={() => setPath('/')}
                        >
                            Stockage commun
                        </span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
        return (
            <Breadcrumb>
                {path.split('/').reduce(
                    (acc, item, index) =>
                        item === ''
                            ? acc
                            : [
                                  ...acc,
                                  <Breadcrumb.Item>
                                      <span
                                          className={'breadcrumblink'}
                                          onClick={() =>
                                              setPath(
                                                  path
                                                      .split('/')
                                                      .filter((a) => a !== '')
                                                      .slice(0, index + 1)
                                                      .join('/')
                                              )
                                          }
                                      >
                                          {item}
                                      </span>
                                  </Breadcrumb.Item>,
                              ],
                    [
                        <Breadcrumb.Item>
                            <span
                                className={'breadcrumblink'}
                                onClick={() => setPath('/')}
                            >
                                Stockage commun
                            </span>
                        </Breadcrumb.Item>,
                    ]
                )}
            </Breadcrumb>
        )
    }

    return (
        <>
            <BreadcrumbItems path={path} setPath={setPath} />
            <DirList
                list={data.filter((a) => a.type === 'dir')}
                callback={(dir) => setPath(path + '/' + dir.name)}
                path={path}
                setPath={setPath}
            />
        </>
    )
}

const PrivateFolders = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    return ();
};

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
        ><PrivateFolders/></TabPane>
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
