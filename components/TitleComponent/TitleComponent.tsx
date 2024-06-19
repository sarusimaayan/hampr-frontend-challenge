import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {AbilityItemProps} from "../AbilitiesComponent/AbilityItem";

export interface TitleComponentProps {
    selectedCharacters: GridRowSelectionModel;
}
export const TitleComponent = ({selectedCharacters}: TitleComponentProps) => {
    return (
        <Stack mb={"8px"}>
            {selectedCharacters?.length === 0 ? (
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Select your squad to defend earthrealm
                </Typography>
            ) : (
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Your champions!
                </Typography>
            )}
        </Stack>
    )
}
