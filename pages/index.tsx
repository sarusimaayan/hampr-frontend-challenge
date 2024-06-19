import { Avatar, Box, Chip, Container, Grid } from '@mui/material'
import jsonData from 'data/characters.json'
import type { Character } from 'types/characters'
import { GridColDef } from '@mui/x-data-grid'

import logo from 'img/Mortal-Kombat-Logo.png'
import Image from 'next/image'
import React, {useMemo} from 'react'
import {HomeContainer} from "../components/HomeContainer/HomeContainer";
import {capitalFirstLetter} from "../utils/utils";

// EXAMPLE: style via css modules (optional)
// import styles from 'styles/index.module.scss'

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

const Home = () => {

  const uniqueCharacterTagNames = useMemo(
      () => {
        let allCharacterTagNames: string[] = [];
        data.forEach((character) => {
          character.tags?.forEach((tag) => {
            allCharacterTagNames.push(tag.tag_name);
          })
        });
        return Array.from(new Set(allCharacterTagNames));
      }, [data]);

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
        <HomeContainer data={data} columns={columns} uniqueTagNames={uniqueCharacterTagNames} />
      </Box>
    </div>
  )
}

export default Home
