import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'
import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'

const getStyles = () => ({
  card: {
    width: '800px'
  }
})

const CarCard = props => {
    const [id] = useState(props.id)
    const [model, setModel] = useState(props.model)
    const [make, setMake] = useState(props.make)
    const [year, setYear] = useState(props.year)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'model':
        setModel(value)
        break
      case 'make':
        setMake(value)
        break
      case 'year':
        setYear(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }


  return (
    <div>
       {editMode ? (
        <UpdateCar
          id={props.id}
          make={props.make}
          model={props.model}
          year={props.year}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' 
            onClick={handleButtonClick} 
            />,
            <RemoveCar id={id} 
            />
          ]}
        > 
       {year} {make} {model} -{'>'} ${price}
        </Card>
       )}
    </div>
  )
}

export default CarCard
