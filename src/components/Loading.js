import { Spin } from 'antd'

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

export default Loading
