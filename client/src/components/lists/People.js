import { useQuery } from '@apollo/client'
import PersonCard from '../listItems/PersonCard'
import Cars from '../lists/Cars'
import { List } from 'antd'
import { GET_PEOPLE_WITH_CARS } from '../../queries'

const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center'
    }
  })

  const People = () => {
    const styles = getStyles()
  
    const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
      <div>
      <h2>Records</h2>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.personWithCars.map(({ id, firstName, lastName, cars }) => (
          <List.Item>
            <PersonCard key={id} id={id} firstName={firstName} lastName={lastName}/>
            <Cars id={id} firstName={firstName} lastName={lastName} cars={cars}/>
          </List.Item>
       ))}
      </List>
      </div>
    )
  }
  
  export default People