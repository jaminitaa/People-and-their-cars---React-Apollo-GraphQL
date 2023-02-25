import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
query GetPeople {
    people {
      id
      firstName
      lastName
    }
}
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const GET_CARS = gql`
query GetCar {
    allcar {
      id
      year
      make
      model
      price
      personId
    }
}
`

export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
    }
  }
`

export const GET_PEOPLE_WITH_CARS = gql`
  query GetCars {
    personWithCars {
      cars {
        id
        make
        model
        personId
        price
        year
      }
      firstName
      id
      lastName
    }
  }
`
