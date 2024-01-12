//pulling in the connection to my local database
const client = require('./client')

const { types, species } = require('./seedData')

//Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
        DROP TABLE IF EXISTS pokemon;
        DROP TABLE IF EXISTS trainers;
        DROP TABLE IF EXISTS species;
        DROP TABLE IF EXISTS types;
        `)
        console.log("Tables dropped!")
    } catch (error) {
        console.log("Error dropping tables: ", error)
    }
}

//Create tables for to give data a home <3
const createTables = async () => {
    try {
        console.log("building tables...")
        await client.query(`
        CREATE TABLE types (
            "typeId" SERIAL PRIMARY KEY,
            type varchar(255) UNIQUE NOT NULL
        );
        CREATE TABLE species (
            "speciesId" SERIAL PRIMARY KEY,
            name varchar(40) UNIQUE NOT NULL,
            "primaryTypeId" INTEGER REFERENCES types("typeId") NOT NULL,
            "secondaryTypeId" INTEGER REFERENCES types("typeId")
        );
        CREATE TABLE trainers (
            "trainerId" SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            "firstName" varchar(255)
        );
        CREATE TABLE pokemon (
            "pokemonId" SERIAL PRIMARY KEY,
            "speciesId" INTEGER REFERENCES species("speciesId") NOT NULL,
            name varchar(40) NOT NULL,
            "trainerId" INTEGER REFERENCES trainers("trainerId"),
            is_fainted BOOLEAN NOT NULL
        );
        `)
        console.log("tables built!")
    } catch (error) {
        console.error(error)
    }
}

//Populate tables for to have data later :)
//Create types
const createInitialTypes = async () => {
    try {
        for (const type of types) {
            // console.log(typeName)
            const {
                rows: [typeName]
            } = await client.query(`
                INSERT INTO types(type)
                VALUES($1);
            `, [type]
            )
        }
        console.log("created types")
    } catch (error) {
        throw error
    }
}

//Create species
const createInitialSpecies = async () => {
    try {
        for (const lilGuy of species) {
            const {
                rows: [species]
            } = await client.query(`
                INSERT INTO species(name, "primaryTypeId", "secondaryTypeId")
                VALUES($1, $2, $3);
            `, [lilGuy.name, lilGuy.primaryTypeId, lilGuy.secondaryTypeId ? lilGuy.secondaryTypeId : null]
            )
        }
        console.log("created species")
    }catch (error) {
        throw error
    }
}

//INSERT INTO table(column)
//VALUES(column_data);

//INSERT INTO users(name)
//VALUES('Megan'); 

//Call all my functions to build my database
const buildDb = async () => {
    try {
        //ACTUALLY CONNECT to my local database
        client.connect()

        //Run our functions
        await dropTables()
        await createTables()

        await createInitialTypes()
        await createInitialSpecies()


    } catch (error) {
        console.error(error)
      //finally will ALWAYS run, whether the catch triggers or not  
    } finally {
        //close our connection to my local database
        client.end()
    }
}

buildDb()