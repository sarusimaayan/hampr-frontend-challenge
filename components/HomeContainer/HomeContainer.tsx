import { Avatar, Chip, Container, Grid, InputAdornment, Stack, TextField } from '@mui/material'
import { TitleComponent } from '../TitleComponent/TitleComponent'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Check } from '@mui/icons-material'
import { CharactersTable } from '../CharactersTable/CharactersTable'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { Character, CharacterAbility } from '../../types/characters'
import { calculateAverageCapabilities, capitalFirstLetter, getSelectedCharactersInfo } from '../../utils/utils'
import { AbilityComponent } from '../AbilitiesComponent/AbilityComponent'
import {MAX_SELECTION} from "../../utils/constants";
import {CharactersTableColumns} from "./CharactersTableColumns";

interface HomeContainerProps {
  data: Character[]
  uniqueTagNames: string[]
}

export const HomeContainer = ({ data, uniqueTagNames }: HomeContainerProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<GridRowSelectionModel>([])
  const [selectedCharactersInfo, setSelectedCharactersInfo] = useState<Character[]>([])
  const [averageCharactersCapabilities, setAverageCapabilities] = useState<CharacterAbility[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleChipClick = (tagName: string) => {
    const tags = selectedTags.includes(tagName)
      ? selectedTags.filter((t) => t !== tagName)
      : [...selectedTags, tagName.toLowerCase()]
    setSelectedTags(tags)
  }

  useEffect(() => {
    if (selectedCharacters.length <= MAX_SELECTION) {
      const arr = getSelectedCharactersInfo(selectedCharacters, data)
      setSelectedCharactersInfo(arr)
      const averages = calculateAverageCapabilities(arr)
      setAverageCapabilities(averages)
    }
  }, [selectedCharacters])

  return (
    <Container maxWidth="lg">
      <Stack mx="auto" mb={{ xs: 3, md: 6 }} width="500px">
        <TitleComponent selectedCharacters={selectedCharacters} />
        <Stack direction={'row'} alignSelf={'center'} spacing={2} marginY={3}>
          {selectedCharactersInfo?.map((character) => (
            <Avatar
              alt={character.name}
              src={character.thumbnail}
              sx={{ width: 80, height: 80, border: 1, borderColor: '#217AFF' }}
            />
          ))}
        </Stack>
        <AbilityComponent averageCharactersCapabilities={averageCharactersCapabilities} />
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
        inputData={data}
        columns={CharactersTableColumns}
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
  )
}
