import {Chip, Container, Grid, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {TitleComponent} from "../TitleComponent/TitleComponent";
import {AbilityItem} from "../AbilitiesComponent/AbilityItem";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {Check} from "@mui/icons-material";
import {CharactersTable} from "../CharactersTable/CharactersTable";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {Character} from "../../types/characters";
import {GridColDef} from "@mui/x-data-grid";
import {capitalFirstLetter} from "../../utils/utils";

// NOTE: data
const MAX_SELECTION = 6 // Maximum number of rows that can be selected

interface HomeContainer {
    data: Character[];
    columns: GridColDef[];
    uniqueTagNames: string[];
}

export const HomeContainer = ({ data, columns, uniqueTagNames }) => {
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

    return (
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
    )
}
