import { Collapse, Select, Input, Button } from 'antd'

const { Option } = Select
const { Panel } = Collapse

const Configuration = () => {
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

export default Configuration
