import {DataGrid, GridColDef, GridRowParams} from "@mui/x-data-grid";
import React from "react";
import {Character} from "../../types/characters";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";

interface CharactersTableProps {
    data: Character[];
    columns: GridColDef[];
    onSelection: (ids: GridRowSelectionModel) => void;
    rowSelectionModel:GridRowSelectionModel | undefined
    searchValue: string
}

export const CharactersTable = ({data, columns, onSelection, rowSelectionModel, searchValue}: CharactersTableProps) => {
    return (
        <DataGrid
            style={{minHeight:"30px"}}
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 5},
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={onSelection}
            rowSelectionModel={rowSelectionModel}
            filterModel={{
                items: [{ field: 'name', operator: 'contains', value: searchValue }],
            }}
        />
    )
}
