import Content from '../../../components/Content/Content'
import ActionsCrud from '../../../components/ActionsCrud/ActionsCrud'
import { ActionsCrudButtons } from '../../../components/ActionsCrud/ActionsCrudStyles'
import Button from '../../../components/Button/Button'
import { FiPlus } from 'react-icons/fi'
import { IoCheckmark, IoClose, IoTrashOutline } from 'react-icons/io5'
import { LuDownload, LuUpload } from 'react-icons/lu'
import Table from '../../../components/Table/Table'
import { ContentTitle } from '../../../components/Content/ContentStyles'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { useState } from 'react'
import ModalCreate from '../../../components/Modals/ModalCreate/ModalCreate'
import { ModalFormInputContainer } from '../../../components/Modals/ModalsStyles'
import Select from '../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import ModalDelete from '../../../components/Modals/ModalDelete/ModalDelete'
import Overlay from '../../../components/Overlay/Overlay'
import BasicFilterDemo from '../../../components/Table/Table'
import { dataEquipos, dataEquiposColumns } from '../../../Data/Equipos/DataEquipos'
import { dataCategorias } from '../../../Data/Categorias/Categorias'

const Equipos = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <Content>
            <ContentTitle>
                Equipos
            </ContentTitle>
            <ActionsCrud>
                <ActionsCrudButtons>
                    <Button bg="success" color="white" onClick={openCreateModal}>
                        <FiPlus />
                        Nuevo
                    </Button>
                    <Button bg="danger" color="white" onClick={openDeleteModal}>
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
            {/* <Table 
                thead={
                    <tr>
                        <th className='th-ellipsis'></th>
                        <th className='th-checkbox'>
                            <input className='checkbox' type="checkbox" name="" id="" />
                        </th>
                        <th className='th-team'>Equipo</th>
                        <th>Categoria</th>
                        <th>Descripcion</th>
                    </tr>
                }
                tbody={
                    <>
                        <tr>
                            <td>
                                <HiOutlineEllipsisVertical className='ellipsis'/>
                            </td>
                            <td>
                                <input className='checkbox' type="checkbox" name="" id="" />
                            </td>
                            <td>
                                <div className='team'>
                                    <img src={"/public/Escudos/lapeste.png"} />
                                    La Peste
                                </div>
                            </td>
                            <td>Serie A</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>
                                <HiOutlineEllipsisVertical className='ellipsis'/>
                            </td>
                            <td>
                                <input className='checkbox' type="checkbox" name="" id="" />
                            </td>
                            <td>
                                <div className='team'>
                                    <img src={"/public/Escudos/celta-de-vino.png"} />
                                    Celta de Vino
                                </div>
                            </td>
                            <td>Serie A</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>
                                <HiOutlineEllipsisVertical className='ellipsis'/>
                            </td>
                            <td>
                                <input className='checkbox' type="checkbox" name="" id="" />
                            </td>
                            <td>
                                <div className='team'>
                                    <img src={"/public/Escudos/pura-quimica.png"} />
                                    Pura Quimica
                                </div>
                            </td>
                            <td>Serie A</td>
                            <td>-</td>
                        </tr>
                    </>
                }
            /> */}
            <Table data={dataEquipos} dataColumns={dataEquiposColumns} arrayName={"Equipos"}/>
            {
                isCreateModalOpen && <>
                    <ModalCreate initial={{ opacity: 0 }}
                    animate={{ opacity: isCreateModalOpen ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    title="Crear equipo"
                    onClickClose={closeCreateModal}
                    buttons={ <>
                            <Button color={"danger"} onClick={closeCreateModal}>
                                <IoClose/>
                                Cancelar
                            </Button>
                            <Button color={"success"} onClick={closeCreateModal}>
                                <IoCheckmark/>
                                Guardar
                            </Button>
                        </>
                    }
                    form={ <>
                            <ModalFormInputContainer>
                                Nombre
                                <Input type='text' placeholder="Escriba el nombre..." />
                            </ModalFormInputContainer>
                            <ModalFormInputContainer>
                                Imagen
                                <Input type='text' placeholder="example.png" />
                            </ModalFormInputContainer>
                            <ModalFormInputContainer>
                                Categoría
                                <Select
                                    data={dataCategorias}
                                    placeholder="Seleccionar equipo"
                                >
                                </Select>
                            </ModalFormInputContainer>
                            <ModalFormInputContainer>
                                Añadir descripción (Opcional)
                                <Input type='text' placeholder="Escriba aqui..." />
                            </ModalFormInputContainer>
                        </>
                    }
                /> 
                    <Overlay onClick={closeCreateModal}/>
                </>
            }
            {
                isDeleteModalOpen && <>
                    <ModalDelete initial={{ opacity: 0 }}
                    animate={{ opacity: isDeleteModalOpen ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    message={"los equipos"}
                    onClickClose={closeDeleteModal}
                    buttons={
                        <>
                            <Button color={"danger"}>
                                <IoClose/>
                                No
                            </Button>
                            <Button color={"success"}>
                                <IoCheckmark/>
                                Si
                            </Button>
                        </>
                    }
                    />
                    <Overlay onClick={closeDeleteModal}/>
                </>
            }
        </Content>
    )
}

export default Equipos