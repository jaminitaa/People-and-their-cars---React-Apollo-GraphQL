import { Card } from 'antd'
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'

const getStyles = () => ({
  card: {
    width: '800px'
  }
})

const PersonCard = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
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
            <RemovePerson id={id} />
          ]}
        >          {firstName} {lastName}
        </Card>
       )}
       <Link to={`person/${props.id}`} id = {id}><div style={{ textAlign: "left" }}>Learn More</div></Link>
    </div>
  )
}

export default PersonCard
