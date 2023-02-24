import CarCards from '../listItems/CarCards'
import { List } from 'antd'

const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center'
    }
  })

  const Cars = props => {
    const { id, firstName, lastName, cars } = props
    const styles = getStyles()

    return (
      <div>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      
          <List.Item>
            <CarCards key={id} id={id} firstName={firstName} lastName={lastName} cars={cars}/>
          </List.Item>
      </List>
      </div>
    )
  }
  
  export default Cars