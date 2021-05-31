import { Space } from 'antd'
import {
    FolderOpenTwoTone,
    FolderAddTwoTone,
    FileAddTwoTone,
} from '@ant-design/icons'

const Explorer = ({ list, callback, path, setPath, uploadFile }) => {
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
            {list.map((item, index) => (
                <div
                    className={'dirlistitem'}
                    key={`${index}-realList`}
                    onClick={() => callback(item)}
                >
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
            <div className={'dirlistitem'} onClick={() => uploadFile()}>
                <Space align={'center'}>
                    <FileAddTwoTone style={{ fontSize: 30 }} />
                    <span style={{ fontSize: 15, marginLeft: 20 }}>
                        Ajouter un fichier
                    </span>
                </Space>
            </div>
        </div>
    )
}

export default Explorer
