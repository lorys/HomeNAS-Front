import { Alert } from 'antd'

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

export default Error
