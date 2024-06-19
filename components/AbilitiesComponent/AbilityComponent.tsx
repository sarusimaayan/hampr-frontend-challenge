import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { AbilityItem } from './AbilityItem'

interface AbilityItemProps {
    averageCharactersCapabilities: Record<any,any>;
}
export const AbilityComponent = ({ averageCharactersCapabilities }: AbilityItemProps) => {
  return (
      <Stack mb={'35px'}>
          <Stack alignItems="center">
              <Stack direction="row">
                  {averageCharactersCapabilities?.map((capability) => (
                      <AbilityItem
                          key={capability.abilityName}
                          abilityName={capability.abilityName}
                          abilityScore={capability.abilityScore}
                      />
                  ))}
              </Stack>
          </Stack>
          <Typography variant="caption" color="#666666" align="left" mt="20px">
              * Totals as average for squad
          </Typography>
      </Stack>
  )
}
