import React from 'react'
import { Container, Typography } from '@mui/material'

export interface AbilityItemProps {
  abilityName: string
  abilityScore: number
}

export const AbilityItem = ({ abilityName, abilityScore }: AbilityItemProps) => {
  return (
    <Container>
      <Typography>{abilityName}</Typography>
      {isNaN(abilityScore) ? (
        <Typography sx={{ fontWeight: 'bold' }}>
          -
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {abilityScore}
        </Typography>
      )}
    </Container>
  )
}
