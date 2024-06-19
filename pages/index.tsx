import { Avatar, Box, Chip, Container, Grid, InputAdornment, TextField, Typography, Stack } from '@mui/material'
import jsonData from 'data/characters.json'
import type { Character } from 'types/characters'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'

import logo from 'img/Mortal-Kombat-Logo.png'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { AbilityItem, AbilityItemProps } from '../components/AbilitiesComponent/AbilityItem'
import { CharactersTable } from '../components/CharactersTable/CharactersTable'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { AbilityComponent } from '../components/AbilitiesComponent/AbilityComponent'
import { TitleComponent } from '../components/TitleComponent/TitleComponent'
import {log} from "next/dist/server/typescript/utils";
import {Check, Clear} from "@mui/icons-material";

// EXAMPLE: style via css modules (optional)
// import styles from 'styles/index.module.scss'

// NOTE: data
const MAX_SELECTION = 6 // Maximum number of rows that can be selected

const data: Character[] = jsonData as Character[]
const columns: GridColDef[] = [
  {
    field: 'thumbnail',
    headerName: 'Character',
    sortable: false,
    width: 80,
    renderCell: (params) => <Avatar src={params.value} />,
  },
  { field: 'name', headerName: '', width: 150 },
  {
    field: 'tags',
    headerName: 'Tags',
    sortable: false,
    width: 400,
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
    headerName: 'Power',
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === 'Power').abilityScore
    },
  },
  {
    field: 'abilities_mobility',
    headerName: 'Mobility',
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === 'Mobility').abilityScore
    },
  },
  {
    field: 'abilities_technique',
    headerName: 'Technique',
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === 'Technique').abilityScore
    },
  },
  {
    field: 'abilities_survivability',
    headerName: 'Survivability',
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === 'Survivability').abilityScore
    },
  },
  {
    field: 'abilities_energy',
    headerName: 'Energy',
    width: 90,
    valueGetter: (value, row) => {
      return row.abilities.find((item) => item.abilityName === 'Energy').abilityScore
    },
  },
]
const allCharacterTagNames: string[] = []
data.forEach((character) => {
  character.tags?.forEach((tag) => {
    allCharacterTagNames.push(tag.tag_name)
  })
})

const uniqueTagNames = Array.from(new Set(allCharacterTagNames))

const capitalFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Home = () => {
  const [showCancelIcon, setShowCancelIcon] = useState(false)
  const [selectedCharacters, setSelectedCharacters] = useState<GridRowSelectionModel>([])
  const [selectedCharactersAvatars, setSelectedCharactersAvatars] = useState<Record<any, any>>([])
  const [averageCharactersCapabilities, setAverageCapabilities] = useState<Record<any, any>>([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChipClick = (tagName: string) => {
    setSelectedTags(prevSelectedTags =>
        prevSelectedTags.includes(tagName)
            ? prevSelectedTags.filter(t => t !== tagName)
            : [...prevSelectedTags, tagName]
    );
  };

  useEffect(() => {
    if (selectedCharacters.length <= MAX_SELECTION) {
      let mobilitySum = 0
      let techniqueSum = 0
      let survivabilitySum = 0
      let powerSum = 0
      let energySum = 0

      selectedCharacters.forEach((id) => {
        const characterObj = data.find((character) => character.id === id)
        // characterObj? setSelectedCharactersAvatars() TODO continue here to populate an array of objects{id,thumbnail}
        characterObj?.abilities.forEach((ability) => {
          switch (ability.abilityName) {
            case 'Power':
              powerSum += ability.abilityScore
              break
            case 'Mobility':
              mobilitySum += ability.abilityScore
              break
            case 'Technique':
              techniqueSum += ability.abilityScore
              break
            case 'Survivability':
              survivabilitySum += ability.abilityScore
              break
            case 'Energy':
              energySum += ability.abilityScore
              break
            default:
          }
        })
      })

      const idsCount = selectedCharacters.length
      const powerAvg = (powerSum / idsCount).toFixed(2)
      const mobilityAvg = (mobilitySum / idsCount).toFixed(2)
      const techniqueAvg = (techniqueSum / idsCount).toFixed(2)
      const survivabilityAvg = (survivabilitySum / idsCount).toFixed(2)
      const energyAvg = (energySum / idsCount).toFixed(2)

      setAverageCapabilities([
        { abilityName: 'Power', abilityScore: powerAvg },
        { abilityName: 'Mobility', abilityScore: mobilityAvg },
        { abilityName: 'Technique', abilityScore: techniqueAvg },
        { abilityName: 'Survivability', abilityScore: survivabilityAvg },
        { abilityName: 'Energy', abilityScore: energyAvg },
      ])
    }
  }, [selectedCharacters])

  // @ts-ignore
  return (
    <div className="root">
      <header className="header">
        <Image src={logo} height={120} className="logo" alt="logo" />
        <p>
          Edit <code>pages/index.tsx</code> and save to reload.
        </p>
      </header>
      <Box
        width="100%"
        // EXAMPLE: style via material-ui/mui style props/sx (optional)
        mb={10}
        bgcolor="#f5faff"
        py={10}
      >
        <Container maxWidth="lg">
          <Stack mx="auto" mb={{ xs: 4, md: 8 }} mt={{ xs: 8, md: 0 }} width="500px">
            <TitleComponent selectedCharacters={selectedCharacters} />
            {/*<AbilityComponent averageCharactersCapabilities={averageCharactersCapabilities}/>*/}
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
            <TextField
              sx={{ bgcolor: 'white' }}
              id="search-box"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.target.value)
              }}
              placeholder={'Search Characters...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Stack>
          <Container>
            <Grid container spacing={1} marginBottom={'55px'}>
              {uniqueTagNames.map((tagName, index) => (
                <Grid item key={index}>
                  <Chip
                    sx={{ bgcolor: 'white' }}
                    label={capitalFirstLetter(tagName)}
                    color="primary"
                    variant="outlined"
                    clickable={true}
                    onClick={() => handleChipClick(tagName)}
                    onDelete={selectedTags.includes(tagName) ? () => handleChipClick(tagName) : undefined}
                    deleteIcon={selectedTags.includes(tagName) ? <Check /> : undefined}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          <CharactersTable
            data={data}
            columns={columns}
            searchValue={searchValue}
            tagsValues={selectedTags}
            onSelection={(ids: GridRowSelectionModel) => {
              if (ids.length <= MAX_SELECTION) {
                setSelectedCharacters(ids)
              }
            }}
            rowSelectionModel={selectedCharacters}
          />
        </Container>
      </Box>
    </div>
  )
}

export default Home
