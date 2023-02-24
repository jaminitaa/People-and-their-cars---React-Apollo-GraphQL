import { List } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import CarCard from './CarCard'



const getStyles = () => ({
  card: {
    width: '600px'
  }
})

const CarCards = props => {
    const { id, cars } = props


  const styles = getStyles()



  return (
    <div>
        <List
          style={styles.list}
          actions={[
            <RemoveCar id={id} 
            />
          ]}
        > 
        {cars.map(({ id, year, model, make, price }) => (    
             <List.Item>
              <CarCard key={id} id={id} year= {year} make={make} model={model} price={price}/>
              
           </List.Item>    
       
        ))}
        </List>

    </div>
  )
}

export default CarCards
