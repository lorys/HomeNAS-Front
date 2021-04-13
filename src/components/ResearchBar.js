import { Form, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const ResearchBar = () => {
    return (
        <>
            <Input className={'searchInput'} />
            <Button type="primary" htmlType="submit" className="searchButton">
                <SearchOutlined />
            </Button>
        </>
    )
}

export default ResearchBar
