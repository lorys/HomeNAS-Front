import { Space } from 'antd'
import {
    FolderOpenTwoTone,
    FolderAddTwoTone,
    FileAddTwoTone,
} from '@ant-design/icons'

const Item = ({ callback, value, Icon }) => {
    return (
        <div className={'dirlistitem'} onClick={() => callback()}>
            <Space align={'center'}>
                {Icon}
                <span style={{ fontSize: 15, marginLeft: 20 }}>{value}</span>
            </Space>
        </div>
    )
}

const Explorer = ({ list, callback, path, setPath, uploadFile }) => {
    return (
        <div className={'dirlist'}>
            {path !== '' && path !== '/' ? (
                <Item
                    callback={() => {
                        setPath(
                            path
                                .split('/')
                                .filter((a) => a !== '')
                                .slice(0, -1)
                                .join('/')
                        )
                    }}
                    value={'...'}
                    Icon={<FolderOpenTwoTone style={{ fontSize: 30 }} />}
                />
            ) : null}
            {list.map((item, index) => (
                <Item
                    callback={() => callback(item)}
                    value={item.name}
                    Icon={<FolderOpenTwoTone style={{ fontSize: 30 }} />}
                />
            ))}
            <Item
                callback={() => callback()}
                value={'Créer un nouveau dossier'}
                Icon={<FolderAddTwoTone style={{ fontSize: 30 }} />}
            />
            <Item
                callback={() => uploadFile()}
                value={'Ajouter un fichier'}
                Icon={<FileAddTwoTone style={{ fontSize: 30 }} />}
            />
        </div>
    )
}

export default Explorer
