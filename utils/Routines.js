export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPokemonId = (id) => {
    let uid = '';
    if(id.length > 4){
        uid = id.split('/')[id.split('/').length - 2].toString();
    } else {
        uid = id.toString();
    }
    let hashid = '';
    if (uid.length === 1) {
        hashid = `#00${uid}`;
    } else if (uid.length === 2) {
        hashid = `#0${uid}`;
    } else {
        hashid = `#${uid}`;
    }
    return hashid;
};

export const getBackgroundColor = (type) => {
    switch (type) {
        case 'grass':
            return 'green';
        case 'fire':
            return '#FF9D55';
        case 'water':
            return 'blue';
        case 'bug':
            return 'green';
        case 'normal':
            return 'grey';
        case 'poison':
            return 'purple';
        case 'electric':
            return '#F4D23C';
        case 'ground':
            return '#D97845';
        case 'fairy':
            return 'pink';
        case 'fighting':
            return 'red';
        case 'psychic':
            return 'purple';
        case 'rock':
            return '#C5B78C';
        case 'ghost':
            return 'purple';
        case 'ice':
            return '#73CEC0';
        case 'dragon':
            return '#0B6DC3';
        case 'dark':
            return '#5A5465';
        case 'steel':
            return '#5A8EA2';
        case 'flying':
            return 'lightblue';
        default:
            return 'grey';
    }
};

export const typeImages = {
    grass: require('../assets/images/icons-type-grass.png'),
    fire: require('../assets/images/icons-type-fire.png'),
    water: require('../assets/images/icons-type-water.png'),
    bug: require('../assets/images/icons-type-bug.png'),
    normal: require('../assets/images/icons-type-normal.png'),
    poison: require('../assets/images/icons-type-poison.png'),
    electric: require('../assets/images/icons-type-electric.png'),
    ground: require('../assets/images/icons-type-ground.png'),
    fairy: require('../assets/images/icons-type-fairy.png'),
    fighting: require('../assets/images/icons-type-fighting.png'),
    psychic: require('../assets/images/icons-type-psychic.png'),
    rock: require('../assets/images/icons-type-rock.png'),
    ghost: require('../assets/images/icons-type-ghost.png'),
    ice: require('../assets/images/icons-type-ice.png'),
    dragon: require('../assets/images/icons-type-dragon.png'),
    dark: require('../assets/images/icons-type-dark.png'),
    steel: require('../assets/images/icons-type-steel.png'),
    flying: require('../assets/images/icons-type-flying.png'),
};