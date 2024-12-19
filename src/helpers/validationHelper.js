const requiredDefined = value => {
    if(value === null || value === undefined) {
        return 'Ce champ est obligatoire';
    }

    return null;
}

export const requiredText = value => {
    const def = requiredDefined(value);

    if(def) {
        return def;
    }

    if(value === '') {
        return 'Veuillez remplir ce champ';
    }

    return true;
}

export const requiredPositiveNumber = value => {
    const def = requiredDefined(value);

    if(def) {
        return def;
    }

    if(value <= 0) {
        return 'Ce champ doit avoir une valeur positive!'
    }

    return true;
}