import {
    houses
} from './houses';
interface House {
    name: string;
    planets: string | string[];
}

interface HouseWithID extends House {
    id: number;
}

function findHouses(houses: string): HouseWithID[];
function findHouses(
    houses: string,
    filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[]): HouseWithID[];
function findHouses(
    houses: House[],
    filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[] | string, filter?: (house: House) => boolean): HouseWithID[] {
    const data: House[] = typeof houses === "string" ? JSON.parse(houses) : houses;

    return (filter ? data.filter(filter) : data).map((house) => {
        return {
            ...house,
            id: data.indexOf(house)
        }
    })
}

console.log(
    findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));