import React from 'react'
import { Stack, Typography } from '@mui/material'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'

export interface TitleComponentProps {
  selectedCharacters: GridRowSelectionModel
}
export const TitleComponent = ({ selectedCharacters }: TitleComponentProps) => {
  return (
    <Stack>
      {selectedCharacters?.length === 0 ? (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Select your squad to defend earthrealm
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Your champions!
        </Typography>
      )}
    </Stack>
  )
}
