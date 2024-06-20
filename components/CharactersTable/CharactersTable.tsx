import { DataGrid, GridColDef, GridLogicOperator } from '@mui/x-data-grid'
import React, {useEffect, useState} from 'react'
import { Character } from '../../types/characters'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'

interface CharactersTableProps {
  inputData: Character[]
  columns: GridColDef[]
  onSelection: (ids: GridRowSelectionModel) => void
  rowSelectionModel: GridRowSelectionModel | undefined
  searchValue: string
  tagsValues: string[]
}

export const CharactersTable = ({
  inputData,
  columns,
  onSelection,
  rowSelectionModel,
  searchValue,
  tagsValues,
}: CharactersTableProps) => {

  const [data, setData] = useState(inputData);

  useEffect(() => {
    if (!searchValue){
      setData(inputData);
    } else {
      setData(data.filter(row => row.name.toLowerCase().includes(searchValue)));
    }
  }, [searchValue]);

  return (
    <DataGrid
      style={{ background: 'white', fontWeight: 'bold', minHeight:'150px' }}
      rows={data}
      columns={columns}
      disableColumnMenu={true}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      onRowSelectionModelChange={onSelection}
      rowSelectionModel={rowSelectionModel}
      filterModel={{
        items: [
          { id: 2, field: 'tags', operator: 'isAnyOf', value: tagsValues },
        ],
      }}
      localeText={{ noRowsLabel: "No character found" }}
    />
  )
}
