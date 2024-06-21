import { Box } from '@mui/material'
import jsonData from 'data/characters.json'
import type { Character } from 'types/characters'
import React, { useMemo } from 'react'
import { HomeContainer } from '../components/HomeContainer/HomeContainer'
import StickyOverlayFrame from '../components/Frame/StickyOverlayFrame'

// EXAMPLE: style via css modules (optional)
// import styles from 'styles/index.module.scss'

const data: Character[] = jsonData as Character[]

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
      <Box width="100%" mb={10} bgcolor="#f5faff" py={10}>
        <header>
          <StickyOverlayFrame />
        </header>
        <HomeContainer data={data} uniqueTagNames={uniqueCharacterTagNames} />
      </Box>
    </div>
  )
}

export default Home
