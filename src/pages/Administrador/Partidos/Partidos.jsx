import Content from '../../../components/Content/Content'
import ActionsCrud from '../../../components/ActionsCrud/ActionsCrud'
import { ActionsCrudButtons } from '../../../components/ActionsCrud/ActionsCrudStyles'
import Button from '../../../components/Button/Button'
import { FiPlus } from 'react-icons/fi'
import { IoTrashOutline } from 'react-icons/io5'
import { LuDownload, LuUpload } from 'react-icons/lu'
import Table from '../../../components/Table/Table'
import { ContentTitle } from '../../../components/Content/ContentStyles'
import { dataPartidos, dataPartidosColumns } from '../../../Data/Partidos/Partidos'

const Partidos = () => {
  return (
    <Content>
            <ContentTitle>
                Partidos
            </ContentTitle>
            <ActionsCrud>
                <ActionsCrudButtons>
                    <Button bg="success" color="white">
                        <FiPlus />
                        Nuevo
                    </Button>
                    <Button bg="danger" color="white">
                        <IoTrashOutline />
                        Eliminar
                    </Button>
                </ActionsCrudButtons>
                <ActionsCrudButtons>
                    <Button bg="import" color="white">
                        <LuUpload />
                        Importar
                    </Button>
                    <Button bg="export" color="white">
                        <LuDownload />
                        Descargar
                    </Button>
                </ActionsCrudButtons>
            </ActionsCrud>
            <Table data={dataPartidos} dataColumns={dataPartidosColumns} arrayName={"Partidos"}/>
        </Content>
  )
}

export default Partidos
