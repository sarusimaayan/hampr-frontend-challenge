import React from "react";
import {Container, Typography} from '@mui/material'

interface TitleItemProps {
    abilityName: string;
    abilityScore: number;
}

export const AbilityItem = ({ abilityName, abilityScore }: TitleItemProps) => {
    return (
        <Container style={{ backgroundColor: 'green' }}>
            <Typography>{abilityName}</Typography>
            <Typography>{abilityScore}</Typography>
        </Container>
    );
}
