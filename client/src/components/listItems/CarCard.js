import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'



const getStyles = () => ({
  card: {
    width: '600px'
  }
})

const CarCard = props => {
    const { id, year, model, make, price} = props

  const styles = getStyles()


  return (
    <div>
        <Card
          style={styles.list}
          actions={[
            <RemoveCar id={id} 
            />
          ]}
        > 
       {year} {make} {model} -{'>'} ${price}
        </Card>
      
    </div>
  )
}

export default CarCard
