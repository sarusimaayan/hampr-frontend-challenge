import { Avatar, Box, Chip, Container, Grid, Paper } from '@mui/material'
import jsonData from 'data/characters.json'
import type { Character } from 'types/characters'
import { AbilityName } from 'types/characters'
import { getGridSingleSelectOperators, GridColDef, GridComparatorFn, GridFilterItem } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { HomeContainer } from '../components/HomeContainer/HomeContainer'
import { capitalFirstLetter } from '../utils/utils'
import StickyOverlayFrame from '../components/Frame/StickyOverlayFrame'

// EXAMPLE: style via css modules (optional)
// import styles from 'styles/index.module.scss'

const tagsSortComparator: GridComparatorFn = (tags1: any, tags2: any) => {
  return tags1.length - tags2.length
}

const tagsFilterOperators = getGridSingleSelectOperators()
  .filter((operator) => operator.value === 'isAnyOf')
  .map((operator) => {
    const newOperator = { ...operator }
    newOperator.getApplyFilterFn = (filterItem: GridFilterItem, column: GridColDef) => {
      return (params): boolean => {
        let isDisplayed = true
        console.log('** filterItem', filterItem)
        filterItem?.value?.forEach((value) => {
          isDisplayed = isDisplayed && params?.find((param) => param.tag_name === value)
        })
        return isDisplayed
      }
    }
    return newOperator
  })

const data: Character[] = jsonData as Character[]
const columns: GridColDef[] = [
  {
    field: 'thumbnail',
    headerName: 'Character',
    sortable: false,
    width: 100,
    renderCell: (params) => <Avatar src={params.value} />,
  },
  { field: 'name', headerName: '', width: 150 },
  {
    field: 'tags',
    headerName: 'Tags',
    sortable: false,
    width: 400,
    sortComparator: tagsSortComparator,
    filterOperators: tagsFilterOperators,
    renderCell: (params) => {
      const characterTagNames: string[] = []
      params.value?.forEach((tag) => {
        characterTagNames.push(tag.tag_name)
      })

      return (
        <Container>
          <Grid container spacing={1}>
            {characterTagNames.map((tagName, index) => (
              <Grid item key={index}>
                <Chip label={capitalFirstLetter(tagName)} color="primary" variant="outlined" />
              </Grid>
            ))}
          </Grid>
        </Container>
      )
    },
  },
  {
    field: 'abilities_power',
    headerName: AbilityName.Power,
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === AbilityName.Power).abilityScore
    },
  },
  {
    field: 'abilities_mobility',
    headerName: AbilityName.Mobility,
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === AbilityName.Mobility).abilityScore
    },
  },
  {
    field: 'abilities_technique',
    headerName: AbilityName.Technique,
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === AbilityName.Technique).abilityScore
    },
  },
  {
    field: 'abilities_survivability',
    headerName: AbilityName.Survivability,
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === AbilityName.Survivability).abilityScore
    },
  },
  {
    field: 'abilities_energy',
    headerName: AbilityName.Energy,
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === AbilityName.Energy).abilityScore
    },
  },
]

const Home = () => {
  const uniqueCharacterTagNames = useMemo(() => {
    let allCharacterTagNames: string[] = []
    data.forEach((character) => {
      character.tags?.forEach((tag) => {
        allCharacterTagNames.push(tag.tag_name)
      })
    })
    return Array.from(new Set(allCharacterTagNames))
  }, [data])

  return (
    <div className="root">
      <Box
        width="100%"
        mb={10}
        bgcolor="#f5faff"
        py={10}
      >
        <header>
          <StickyOverlayFrame />
        </header>
        <HomeContainer data={data} columns={columns} uniqueTagNames={uniqueCharacterTagNames} />
      </Box>
    </div>
  )
}

export default Home
