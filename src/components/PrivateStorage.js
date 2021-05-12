import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Alert, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Error, Loading } from '.'

const LoginModal = ({ connect, setConnect, setPrivateData }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const passwordRef = useRef(null)
    const passwordVerifRef = useRef(null)
    const login = () => {
        const password = passwordRef.current.input.value
        setLoading(true)
        fetch(`http://localhost:3001/api/users/login/${connect.user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // mode: 'cors',
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
    const savePassword = () => {
        const password = passwordRef.current.input.value
        const passwordVerif = passwordVerifRef.current.input.value
        setLoading(true)
        if (passwordVerif === password && password.length > 1) {
            fetch(`http://localhost:3001/api/users/login/${connect.user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // mode: 'cors',
                body: JSON.stringify({ user: connect, password: password }),
            })
                .then((response) => response.json())
                .catch((e) => setError(1))
                .then((e) => {
                    console.log(e)
                    setPrivateData(e.data)
                    setLoading(false)
                })
        } else {
            setError(0)
        }
    }
    if (!connect) return <></>
    const Password = () => (
        <>
            <p>Connexion en tant que {connect.user}</p>
            <Input.Password placeholder={'Mot de passe'} />
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
        </>
    )
    const CreatePassword = () => (
        <>
            <p>Création de mot de passe pour {connect.user}</p>
            <Input.Password
                ref={passwordRef}
                placeholder={'Votre mot de passe'}
                id="password"
            />
            <Input.Password
                ref={passwordVerifRef}
                id="passwordVerif"
                style={{ marginTop: 15 }}
                placeholder={'Retapez votre mot de passe'}
            />
            {error !== null ? (
                <Alert
                    message={
                        [
                            'Les mots de passes ne sont pas identiques.',
                            'Erreur côté serveur.',
                        ][error]
                    }
                    type="error"
                />
            ) : null}
        </>
    )
    return (
        <Modal
            title={'Connexion au stockage sécurisé'}
            visible={connect}
            onOk={() => (connect.password ? login() : savePassword())}
            onCancel={() => setConnect(false)}
            confirmLoading={loading}
            cancelText={'Fermer'}
            okText={'Connexion'}
        >
            {connect.password ? <Password /> : <CreatePassword />}
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
                        key={index + '_listuser'}
                    >
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h3>{item.user}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PrivateStorage
