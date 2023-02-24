import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {REMOVE_CAR, GET_CAR} from '../../queries'

import filter from 'lodash.filter'

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { car } = cache.readQuery({ query: GET_CAR })
      cache.writeQuery({
        query: GET_CAR,
        data: {
            car: filter(car, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveCar