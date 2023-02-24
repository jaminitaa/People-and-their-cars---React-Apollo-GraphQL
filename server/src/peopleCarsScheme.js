import { gql } from 'apollo-server-express'
import { getArgumentValues } from 'graphql'
import { find, remove, filter } from 'lodash'

const peopleArray = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const carsArray = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]


const typeDefs = gql`
type People {
  id:String!
  firstName: String
  lastName: String
}

type Person {
  id: String!
  firstName: String
  lastName: String
  cars: [Cars]
}  

type Query {
  person(id: String!): People
  people:[People]
  car: [Cars]
  cars(personId: String!):[Cars]
  personWithCars: [PersonWithCars]
}

type Mutation {
  addPerson(id:String!, firstName:String!, lastName:String!): People
  updatePerson(id: String!, firstName: String, lastName: String): People
  removePerson(id: String!): People
  addCar(personId: String!, year: String!, make: String!, model: String!, price: Float!, id: String): Cars
  updateCar(id: String!, personId: String!, year: String!, make: String!, model: String!, price: Float!): Cars
  removeCar(id: String!): Cars
}

type Cars {
  id: String!
  year: String
  make: String
  model: String
  price: Float
  personId: String!
}

type PersonWithCars {
  id: String!
  firstName: String
  lastName: String
  cars: [Cars]
}
`

const resolvers = {
  Query: {
    people:() => peopleArray,
    person:(root, args) => {
      return find(peopleArray, { id: args.id })
    },
    cars: (parent, args, context, info) => {
      return filter(carsArray, { personId: args.personId})
    },
    car: () => carsArray,
    personWithCars: () => {
      let personCarsArray = [];
      peopleArray.forEach(element => {
        let person = element;
        person.cars = carsArray.filter(c => c.personId === element.id)
        personCarsArray.push(person)
      });
      return personCarsArray

    }
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      peopleArray.push(newPerson)

      return newPerson
    },

    updatePerson: (root, args) => {
      const person = find(peopleArray, { id: args.id })
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`)

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },

    removePerson: (root, args) => {
      const removedPerson = find(peopleArray, { id: args.id })

      if (!removedPerson) throw new Error(`Couldn't find contact with id ${args.id}`)

      remove(peopleArray, c => {
        return c.id === removedPerson.id
      })

      return removedPerson
    },

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      };

      cars.push(newCar);

      return newCar;
    },

    removeCar: (root, args) => {
      const removedCar = find(carsArray, { id: args.id })

      if (!removedCar) throw new Error(`Couldn't find contact with id ${args.id}`)

      remove(carsArray, c => {
        return c.id === removedCar.id
      })

      return removedCar
    },
  }
}

export { typeDefs, resolvers }