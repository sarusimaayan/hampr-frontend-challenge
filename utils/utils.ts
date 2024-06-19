import {GridRowId} from "@mui/x-data-grid";
import {AbilityName} from "../types/characters";

export const capitalFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const calculateAverageCapabilities = (selectedCharacters: GridRowId[], data) => {
    let mobilitySum = 0
    let techniqueSum = 0
    let survivabilitySum = 0
    let powerSum = 0
    let energySum = 0

    selectedCharacters.forEach((id) => {
        const characterObj = data.find((character) => character.id === id)
        characterObj?.abilities.forEach((ability) => {
            switch (ability.abilityName) {
                case AbilityName.Power:
                    powerSum += ability.abilityScore
                    break
                case AbilityName.Mobility:
                    mobilitySum += ability.abilityScore
                    break
                case AbilityName.Technique:
                    techniqueSum += ability.abilityScore
                    break
                case AbilityName.Survivability:
                    survivabilitySum += ability.abilityScore
                    break
                case AbilityName.Energy:
                    energySum += ability.abilityScore
                    break
                default:
            }
        })
    })

    const idsCount = selectedCharacters.length;
    const powerAvg = (powerSum / idsCount).toFixed(2);
    const mobilityAvg = (mobilitySum / idsCount).toFixed(2);
    const techniqueAvg = (techniqueSum / idsCount).toFixed(2);
    const survivabilityAvg = (survivabilitySum / idsCount).toFixed(2);
    const energyAvg = (energySum / idsCount).toFixed(2);

    return [
        {abilityName: AbilityName.Power, abilityScore: powerAvg},
        {abilityName: AbilityName.Mobility, abilityScore: mobilityAvg},
        {abilityName: AbilityName.Technique, abilityScore: techniqueAvg},
        {abilityName: AbilityName.Survivability, abilityScore: survivabilityAvg},
        {abilityName: AbilityName.Energy, abilityScore: energyAvg},
    ];
}
