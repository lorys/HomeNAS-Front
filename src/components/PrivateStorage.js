import { useState, useEffect } from 'react'
import { Modal, Input, Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Error, Loading } from '.'

const PrivateStorage = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [auth, setAuth] = useState(null)
    useEffect(() => {
        if (!users)
            fetch('/api/users/list')
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
            <Modal
                title={'Connexion au stockage sécurisé'}
                visible={auth !== null}
                onOk={setAuth(null)}
                confirmLoading={auth ? auth.confirmLoading : false}
            >
                <p>Connexion en tant que {auth.name}</p>
                <Input placeholder={'mot de passe'} />
                <Button type={'primary'}>Connexion</Button>
            </Modal>
            <div style={{ textAlign: 'center' }}>
                {users.map((item, index) => (
                    <div
                        className={'userAvatar'}
                        onClick={() => {
                            setAuth({ name: item, confirmLoading: false })
                        }}
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
