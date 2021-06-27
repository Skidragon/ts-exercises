
interface Dog {
    name: string;
    breed: string;
}
const dogs: Dog[] = [
    {
        name: 'Pat',
        breed: 'Bulldog'
    },
    {
        name: 'Boots',
        breed: 'Pomegranate'
    }
];

const forEach = <T>(data: T[], cb: (item: T, index: number) => void) => {
    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        cb(item, i);
    }
}
const map = <T>(data: T[], cb: (item: T, index: number) => unknown) => {
    const newArr = [];

    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        let updatedItem = cb(item, i);
        newArr.push(updatedItem);
    }
    return newArr;
}

const filter = <T>(data: T[], cb: (item: T, index: number) => boolean): T[] => {
    const filteredArr = [];

    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        if(cb(item, i)) {
            filteredArr.push(item);
        }
    }
    return filteredArr;
}
forEach(dogs, (dog) => {
    console.log(dog);
})

interface MappedDog extends Dog {
    age: number;
}
const mappedDogs = map(dogs, (dog) => {
    return {
        ...dog,
        age: 13
    }
})
console.log(mappedDogs);
const filteredDogs = filter(dogs, (dog) => {
    return dog.name === 'Boots';
})
console.log(filteredDogs)