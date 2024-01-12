//Make some arrays of objects based on the schema I created

//trainers
const trainers = [
    {username: "bestTrainerEvah", password: "snorlaxLyfe", firstName: "Megan"},
    {username: "gottaCatch", password: "emAll", firstName: "Estela"},
    {username: "squirtle", password: "justALilGuy", firstName: "Cheyenne"}
]

//pokemon
const pokemon = [
    {speciesId: 1, name: "Lotus", trainerId: 1, isFainted: true},
    {speciesId: 2, name: "Arson", isFainted: false},
    {speciesId: 2, name: "Newt", trainerId: 2, isFainted: false}
]

//species
const species = [
    {name: "Bulbasaur", primaryTypeId: 2, secondaryTypeId: 18},
    {name: "Charmander", primaryTypeId: 4},
    {name: "Squirtle", primaryTypeId: 3}
]

//types 
const types = [
    "Normal",
    "Grass",
    "Water",
    "Fire",
    "Electric",
    "Ground",
    "Rock",
    "Steel",
    "Fighting",
    "Flying",
    "Dragon",
    "Dark",
    "Bug",
    "Psychic",
    "Ghost",
    "Fairy",
    "Ice",
    "Poison",
    "???",
    "n/a"
]

//export our mock data variables for use elsewhere
module.exports = { trainers, pokemon, species, types }