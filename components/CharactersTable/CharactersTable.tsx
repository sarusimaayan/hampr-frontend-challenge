import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {Character} from "../../types/characters";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";

interface CharactersTableProps {
    data: Character[];
    columns: GridColDef[];
    onSelection: (ids: GridRowSelectionModel) => void;
}

export const CharactersTable = ({data, columns, onSelection}: CharactersTableProps) => {
    return (
        <DataGrid
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
        />
    )
}
