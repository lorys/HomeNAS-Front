import { useState, useEffect } from 'react'
import { Modal, Input, Alert, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Error, Loading } from '.'

const LoginModal = ({ connect, setConnect, setPrivateData }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [password, setPassword] = useState('')
    const login = () => {
        setLoading(true)
        fetch(`http://localhost:3001/api/users/login/${connect}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: connect, password: password }),
        })
            .then((response) => response.json())
            .catch((e) => setError(1))
            .then((response) => {
                if (!response.status) setLoading(false)
                else {
                    if (response.status === 'KO') setError(2)
                    else if (response.status === 'OK')
                        setPrivateData(response.files)
                    setLoading(false)
                }
            })
    }
    if (!connect) return <></>
    return (
        <Modal
            title={'Connexion au stockage sécurisé'}
            visible={connect}
            onOk={() => login()}
            onCancel={() => setConnect(false)}
            confirmLoading={loading}
            cancelText={'Fermer'}
            okText={'Connexion'}
        >
            <p>Connexion en tant que {connect}</p>
            <Input.Password
                placeholder={'Mot de passe'}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error ? (
                <Alert
                    message={
                        error === 1
                            ? 'Erreur côté serveur'
                            : 'Mauvais mot de passe'
                    }
                    type="error"
                />
            ) : null}
        </Modal>
    )
}

const PrivateStorage = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [connect, setConnect] = useState(false)
    const [privateData, setPrivateData] = useState(null)
    useEffect(() => {
        if (!users)
            fetch('http://localhost:3001/api/users/list')
                .then((response) => response.json())
                .catch((e) => setError(true))
                .then((response) => {
                    setUsers(response)
                    setLoading(false)
                })
    })
    if (error) return <Error error={''} />
    if (loading) return <Loading />
    return (
        <>
            <LoginModal
                connect={connect}
                setPrivateData={setPrivateData}
                setConnect={setConnect}
            />
            <div style={{ textAlign: 'center' }}>
                {users.map((item, index) => (
                    <div
                        className={'userAvatar'}
                        onClick={() => setConnect(item)}
                    >
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h3>{item}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PrivateStorage
