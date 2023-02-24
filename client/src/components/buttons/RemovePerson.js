import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {REMOVE_PERSON, GET_PEOPLE_WITH_CARS} from '../../queries'

import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const {personWithCars } = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
      cache.writeQuery({
        query: GET_PEOPLE_WITH_CARS,
        data: {
          personWithCars: filter(personWithCars, c => {
            return c.id !== removePerson.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemovePerson
