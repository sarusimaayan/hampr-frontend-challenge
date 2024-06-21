import {getGridSingleSelectOperators, GridColDef, GridComparatorFn, GridFilterItem} from "@mui/x-data-grid";
import {Avatar, Chip, Container, Grid} from "@mui/material";
import {capitalFirstLetter} from "../../utils/utils";
import {AbilityName} from "../../types/characters";
import React from "react";

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
                filterItem?.value?.forEach((value) => {
                    isDisplayed = isDisplayed && params?.find((param) => param.tag_name === value)
                })
                return isDisplayed
            }
        }
        return newOperator
    })

export const CharactersTableColumns: GridColDef[] = [
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
