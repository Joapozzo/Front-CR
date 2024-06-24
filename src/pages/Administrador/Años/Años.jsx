import React, { useEffect, useState } from 'react';
import Content from '../../../components/Content/Content'
import ActionsCrud from '../../../components/ActionsCrud/ActionsCrud';
import { ActionsCrudButtons } from '../../../components/ActionsCrud/ActionsCrudStyles';
import Button from '../../../components/Button/Button';
import { FiPlus } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';
import { LuDownload, LuUpload } from 'react-icons/lu';
import Table from '../../../components/Table/Table';
import { ContentTitle } from '../../../components/Content/ContentStyles';
import ModalCreate from '../../../components/Modals/ModalCreate/ModalCreate';
import { ModalFormInputContainer } from '../../../components/Modals/ModalsStyles';
import Input from '../../../components/Input/Input';
import { IoCheckmark, IoClose } from "react-icons/io5";
import ModalDelete from '../../../components/Modals/ModalDelete/ModalDelete';
import Overlay from '../../../components/Overlay/Overlay';
import { dataAñosColumns } from '../../../Data/Años/DataAños';
import Axios from 'axios';
import { URL } from '../../../utils/utils';
import { Toaster, toast } from 'react-hot-toast';
import Papa from 'papaparse';  // Importa papaparse
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedRows } from '../../../redux/SelectedRows/selectedRowsSlice';

const Años = () => {
    // Estado de los modales
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Variables de los inputs
    const [año, setAño] = useState("");
    const [descripcion, setDescripcion] = useState("");

    // Listado de años
    const [añosList, setAños] = useState([])

    // Selección de filas
    const selectedRows = useSelector(state => state.selectedRows.selectedRows);
    const dispatch = useDispatch();

    // Funcion para traer la lista de los años
    const getAños = () => {
        Axios.get(`${URL}/admin/get-anios`).then((response)=>{
            setAños(response.data)
        })
    }
    
    // Llamar a la API cuando el componente se monta
    useEffect(() => {
        getAños();
        // Limpiar las selecciones cuando el componente se desmonte
        return () => {
            dispatch(clearSelectedRows());
        };
    }, []); // Este efecto solo se ejecuta una vez cuando el componente se monta

    // Funcion para agregar un nuevo año
    const agregarAño = () => {
        if (año !== "") {
            const addAnioPromise = Axios.post(`${URL}/admin/crear-anio`, {
                año,
                descripcion
            }).then(() => {
                getAños();
                closeCreateModal();
                setAño("")
                setDescripcion("")
            });
            toast.promise(
                addAnioPromise,
                {
                    loading: 'Guardando...',
                    success: <b>Año registrado correctamente.</b>,
                    error: <b>No se pudo registrar el año.</b>,
                }
            );
        } else {
            toast.error("Completá los campos.")
        }
    }

    // Funciones para manejar la apertura y cierre de los modales
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    // Funcion para eliminar los años seleccionados
    const eliminarAños = () => {
        if (selectedRows.length > 0) {
            const deletePromises = selectedRows.map(row => 
                Axios.post(`${URL}/admin/delete-anio`, { id: row.id_año })
            );
            Promise.all(deletePromises).then(() => {
                getAños();
                closeDeleteModal();
                dispatch(clearSelectedRows());
                toast.success("Años eliminados correctamente.");
            }).catch(() => {
                toast.error("No se pudieron eliminar los años.");
            });
        } else {
            toast.error("No hay años seleccionados.");
        }
    };

    // Funcion para importar datos de un .csv
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true, // Opción para omitir líneas vacías
            complete: async (results) => {
                const data = results.data.filter(row => Object.keys(row).length > 0); // Filtrar filas vacías
                console.log(data);
                try {
                    await Axios.post(`${URL}/admin/importar-anios`, data);
                    toast.success("Datos importados correctamente");
                    getAños();
                } catch (error) {
                    toast.error("Error al importar los datos");
                }
            },
            error: (error) => {
                toast.error("Error al leer el archivo");
                console.error(error);
            }
        });
    };


    // Funcion para exportar datos a un .csv
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let csv = '\uFEFF'; // BOM (Byte Order Mark)
    
        // Agregar encabezados
        const headers = Object.keys(array[0]).filter(key => key !== 'id_año');
        csv += headers.join(',') + '\r\n';
    
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (index !== 'id_año') {
                    if (line !== '') line += ',';
                    line += array[i][index];
                }
            }
            if (line.trim() !== '') { // Evitar agregar líneas vacías
                csv += line + '\r\n';
            }
        }
    
        return csv;
    };
    
    // Funcion para exportar datos a un .csv
    const handleExport = () => {
        const csv = convertToCSV(añosList);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
    
        link.setAttribute('href', url);
        link.setAttribute('download', 'años.csv');
        link.style.visibility = 'hidden';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    return (
        <Content>
            <Toaster/>
            <ContentTitle>Años</ContentTitle>
            <ActionsCrud>
                <ActionsCrudButtons>
                    <Button bg="success" color="white" onClick={openCreateModal}>
                        <FiPlus />
                        <p>Nuevo</p>
                    </Button>
                    <Button bg="danger" color="white" onClick={openDeleteModal}>
                        <IoTrashOutline />
                        <p>Eliminar</p>
                    </Button>
                </ActionsCrudButtons>
                <ActionsCrudButtons>
                    <label htmlFor="importInput" style={{ display: 'none' }}>
                        <input id="importInput" type="file" accept=".csv" onChange={handleFileChange} />
                    </label>
                    <Button bg="import" color="white" as="label" htmlFor="importInput">
                        <LuUpload />
                        <p>Importar</p>
                    </Button>
                    <Button bg="export" color="white" onClick={handleExport}>
                        <LuDownload />
                        <p>Descargar</p>
                    </Button>
                </ActionsCrudButtons>
            </ActionsCrud>
            <Table data={añosList} dataColumns={dataAñosColumns} arrayName={"Años"} id_={"id_año"}/>
            
            {
                isCreateModalOpen && <>
                    <ModalCreate initial={{ opacity: 0 }}
                        animate={{ opacity: isCreateModalOpen ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        title="Crear año"
                        onClickClose={closeCreateModal}
                        buttons={
                            <>
                                <Button color={"danger"} onClick={closeCreateModal}>
                                    <IoClose/>
                                    Cancelar
                                </Button>
                                <Button color={"success"} onClick={agregarAño}>
                                    <IoCheckmark/>
                                    Guardar
                                </Button>
                            </>
                        }
                        form={
                            <>
                                <ModalFormInputContainer>
                                    Año
                                    <Input type='text' placeholder="Escriba aqui el año..." 
                                    onChange={(event) => { setAño(event.target.value)}}/>
                                </ModalFormInputContainer>
                                <ModalFormInputContainer>
                                    Añadir descripción (Opcional)
                                    <Input type='text' placeholder="Escriba aqui..." 
                                    onChange={(event) => { setDescripcion(event.target.value)}}/>
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
                    message={"los años"}
                    onClickClose={closeDeleteModal}
                    buttons={
                        <>
                            <Button color={"danger"} onClick={closeDeleteModal}>
                                <IoClose />
                                No
                            </Button>
                            <Button color={"success"} onClick={eliminarAños}>
                                <IoCheckmark />
                                Sí
                            </Button>
                        </>
                    }
                    />
                    <Overlay onClick={closeDeleteModal}/>
                </>
            }
        </Content>
    );
};

export default Años;
