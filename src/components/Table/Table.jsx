import React from 'react';
import { Column } from 'primereact/column';
import { TableContainerStyled } from './TableStyles';

const Table = ({data, dataColumns, arrayName}) => {
    const imageBodyTemplate = rowData => (
        <div className="td-team">
            <img src={`/Escudos/${rowData.img}`} alt={rowData.nombre} />
            <span>{rowData.nombre}</span>
        </div>
    );
    
    const cellPlayerTemplate = rowData => (
        <div className="td-player">
            <img src='/user-default.png' alt={rowData.nombre} />
            <span>{rowData.nombre}</span>
        </div>
    );

    const dataAvalaible = data.length > 0

    return (
        <>
            {
                dataAvalaible && <TableContainerStyled 
                    value={data} 
                    removableSort 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25, 50]} 
                    emptyMessage="No hay datos disponibles"
                >
                    {dataColumns.map((col, i) => (
                        <Column 
                            key={col.field} 
                            field={col.field} 
                            header={col.header} 
                            sortable 
                            style={{ width: 'auto' }} 
                            body={
                                arrayName === 'Equipos' && col.field === 'nombre'
                                    ? imageBodyTemplate
                                    : arrayName === 'Jugadores' && col.field === 'nombre'
                                    ? cellPlayerTemplate
                                    : null
                            }
                        />
                    ))}
                    </TableContainerStyled>
            }
        </>
    );
}

export default Table