import {Avatar, Box, Chip, Container, Grid, InputAdornment, TextField, Typography, Stack} from '@mui/material'
import jsonData from 'data/characters.json'
import type {Character} from 'types/characters'
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import DoneIcon from '@mui/icons-material/Done';

import logo from 'img/Mortal-Kombat-Logo.png'
import Image from 'next/image'
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {AbilityItem} from "../components/AbilitiesComponent/AbilityItem";
import {CharactersTable} from "../components/CharactersTable/CharactersTable";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";

// EXAMPLE: style via css modules (optional)
// import styles from 'styles/index.module.scss'

// NOTE: data
const data: Character[] = jsonData as Character[];
const columns: GridColDef[] = [
    {
        field: 'thumbnail',
        headerName: 'Character',
        sortable: false,
        width: 80,
        renderCell: (params) => <Avatar src={params.value}/>
    },
    {field: 'name', headerName: '', width: 150},
    {
        field: 'tags', headerName: 'Tags', sortable: false, width: 400,
        renderCell: (params) => {
            const characterTagNames: string[] = [];
            params.value?.forEach(tag => {
                characterTagNames.push(tag.tag_name);
            });

            return (
                <Container>
                    <Grid container spacing={1}>
                        {characterTagNames.map((tagName, index) => (
                            <Grid item key={index}>
                                <Chip label={capitalFirstLetter(tagName)}
                                      color="primary"
                                      variant="outlined"/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            );
        },
    },
    {
        field: 'abilities_power',
        headerName: 'Power',
        width: 90,
        valueGetter: (value, row) => {
            return row.abilities.find((item) => item.abilityName === "Power").abilityScore
        },
    },
    {
        field: 'abilities_mobility',
        headerName: 'Mobility',
        width: 90,
        valueGetter: (value, row) => {
            return row.abilities.find((item) => item.abilityName === "Mobility").abilityScore
        },
    },
    {
        field: 'abilities_technique',
        headerName: 'Technique',
        width: 90,
        valueGetter: (value, row) => {
            return row.abilities.find((item) => item.abilityName === "Technique").abilityScore
        },
    },
    {
        field: 'abilities_survivability',
        headerName: 'Survivability',
        width: 90,
        valueGetter: (value, row) => {
            return row.abilities.find((item) => item.abilityName === "Survivability").abilityScore
        },
    },
    {
        field: 'abilities_energy',
        headerName: 'Energy',
        width: 90,
        valueGetter: (value, row) => {
            return row.abilities.find((item) => item.abilityName === "Energy").abilityScore
        },
    },
];
const allCharacterTagNames: string[] = [];
data.forEach(character => {
    character.tags?.forEach(tag => {
        allCharacterTagNames.push(tag.tag_name);
    });
});

const uniqueTagNames = Array.from(new Set(allCharacterTagNames));

const capitalFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const Home = () => {
    const [showCancelIcon, setShowCancelIcon] = useState(false);
    const [selectedCharacters, setSelectedCharacters] = useState<GridRowSelectionModel>([]);
    const [averageCharacterCapabilities, setAverageCapabilities] = useState<Record<any, any>>([]);

    const handleChipClick = () => {
        console.info('You clicked the Chip.');
        setShowCancelIcon(true);
    };

    const handleChipDelete = () => {
        console.info('You clicked the delete icon.');
        setShowCancelIcon(false);
    };

    useEffect(() => {
        if (selectedCharacters.length > 0) {
            let mobilitySum = 0;
            let techniqueSum = 0;
            let survivabilitySum = 0;
            let powerSum = 0;
            let energySum = 0;

            selectedCharacters.forEach(id => {
                const characterObj = data.find(character => character.id === id);
                characterObj?.abilities.forEach(ability => {
                    switch (ability.abilityName){
                        case "Mobility":
                            mobilitySum += ability.abilityScore;
                            break
                        case "Technique":
                            techniqueSum += ability.abilityScore;
                            break
                        case "Survivability":
                            survivabilitySum += ability.abilityScore;
                            break
                        case "Power":
                            powerSum += ability.abilityScore;
                            break
                        case "Energy":
                            energySum += ability.abilityScore;
                            break
                        default:
                    }
                });
            });

            const idsCount = selectedCharacters.length;
            const mobilityAvg = mobilitySum / idsCount;
            const techniqueAvg = techniqueSum / idsCount;
            const survivabilityAvg = survivabilitySum / idsCount;
            const powerAvg = powerSum / idsCount;
            const energyAvg = energySum / idsCount;

            setAverageCapabilities([
                {abilityName: 'Mobility', abilityScore: mobilityAvg},
                {abilityName: 'Technique', abilityScore: techniqueAvg},
                {abilityName: 'Survivability', abilityScore: survivabilityAvg},
                {abilityName: 'Power', abilityScore: powerAvg},
                {abilityName: 'Energy', abilityScore: energyAvg},
            ]);
        }
    }, [selectedCharacters]);

    return (
        <div className="root">
            <header className="header">
                <Image src={logo} height={120} className="logo" alt="logo"/>
                <p>
                    Edit <code>pages/index.tsx</code> and save to reload.
                </p>
            </header>
            <Box width="100%"
                // EXAMPLE: style via material-ui/mui style props/sx (optional)
                 mb={10}
                 bgcolor="#f5faff"
                 py={10}
            >
                <Container maxWidth="lg">
                    <Box mx="auto" textAlign="center" mb={{xs: 4, md: 8}} mt={{xs: 8, md: 0}} width="500px">
                        <Typography variant="h5" component="h2"
                                    sx={{
                                        fontWeight: 'bold',
                                        // color: 'red'
                                    }}
                        >
                            Select your squad
                        </Typography>
                        <Stack direction="row" sx={{flexGrow: 1}}>
                            {averageCharacterCapabilities.map(capability => (
                                <AbilityItem abilityName={capability.abilityName}
                                             abilityScore={capability.abilityScore}/>
                            ))}
                        </Stack>
                        <TextField
                            id="search-box"
                            variant="outlined"
                            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            //     setName(event.target.value);
                            // }}
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
                    </Box>
                    <Container>
                        <Grid container spacing={1} marginBottom={"55px"}>
                            {uniqueTagNames.map((tagName, index) => (
                                <Grid item key={index}>
                                    <Chip label={capitalFirstLetter(tagName)}
                                          onClick={handleChipClick}
                                        // onDelete={handleChipDelete}
                                          color="primary"
                                          variant="outlined"
                                        // deleteIcon={<DoneIcon />}
                                        // deleteIcon={showCancelIcon ? <CancelRoundedIcon /> : undefined}
                                        // onDelete={showCancelIcon ? () => {} : undefined}
                                    />

                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <CharactersTable
                        data={data}
                        columns={columns}
                        onSelection={(ids: GridRowSelectionModel) => {
                            setSelectedCharacters(ids);
                        }}
                    />
                </Container>
            </Box>
        </div>
    )
}

export default Home
