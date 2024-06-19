import {Chip, Container, Grid, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {TitleComponent} from "../TitleComponent/TitleComponent";
import {AbilityItem} from "../AbilitiesComponent/AbilityItem";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {Check} from "@mui/icons-material";
import {CharactersTable} from "../CharactersTable/CharactersTable";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {Character, CharacterAbility} from "../../types/characters";
import {GridColDef} from "@mui/x-data-grid";
import {calculateAverageCapabilities, capitalFirstLetter} from "../../utils/utils";
import {AbilityComponent} from "../AbilitiesComponent/AbilityComponent";

// NOTE: data
const MAX_SELECTION = 6 // Maximum number of rows that can be selected

interface HomeContainerProps {
    data: Character[];
    columns: GridColDef[];
    uniqueTagNames: string[];
}

export const HomeContainer = ({data, columns, uniqueTagNames}: HomeContainerProps) => {
    const [selectedCharacters, setSelectedCharacters] = useState<GridRowSelectionModel>([])
    const [selectedCharactersAvatars, setSelectedCharactersAvatars] = useState<Record<any, any>>([])
    const [averageCharactersCapabilities, setAverageCapabilities] = useState<CharacterAbility[]>([])
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
            const averages = calculateAverageCapabilities(selectedCharacters, data);
            setAverageCapabilities(averages);
        }
    }, [selectedCharacters]);

    return (
        <Container maxWidth="lg">
            <Stack mx="auto" mb={{xs: 4, md: 8}} mt={{xs: 8, md: 0}} width="500px">
                <TitleComponent selectedCharacters={selectedCharacters}/>
                <AbilityComponent averageCharactersCapabilities={averageCharactersCapabilities}/>
                <TextField
                    sx={{bgcolor: 'white'}}
                    id="search-box"
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchValue(event.target.value)
                    }}
                    placeholder={'Search Characters...'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
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
                                sx={{bgcolor: 'white'}}
                                label={capitalFirstLetter(tagName)}
                                color="primary"
                                variant="outlined"
                                clickable={true}
                                onClick={() => handleChipClick(tagName)}
                                onDelete={selectedTags.includes(tagName) ? () => handleChipClick(tagName) : undefined}
                                deleteIcon={selectedTags.includes(tagName) ? <Check/> : undefined}
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
