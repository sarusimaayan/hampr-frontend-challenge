import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { AbilityItem, AbilityItemProps } from './AbilityItem'

// interface TitleItemProps {
//     abilityName: string;
//     abilityScore: number;
// }
// interface TitleItemProps {
//     averageCharactersCapabilities: TitleItemProps[];
// }

export const AbilityComponent = (averageCharactersCapabilities: AbilityItemProps[] | undefined) => {
  return (
      <Stack mb={'35px'}>
          <Stack alignItems="center">
              <Stack direction="row">
                  {averageCharactersCapabilities?.map((capability) => (
                      <AbilityItem abilityName={capability.abilityName} abilityScore={capability.abilityScore} />
                  ))}
              </Stack>
          </Stack>
          <Typography variant="caption" color="#666666" align="left" mt="20px">
              * Totals as average for squad
          </Typography>
      </Stack>
  )
}
