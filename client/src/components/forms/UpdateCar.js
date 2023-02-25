import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR, GET_PEOPLE } from '../../queries'

const { Option } = Select;

const UpdateCar = props => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [id] = useState(props.id)
  const [model, setModel] = useState(props.model)
  const [make, setMake] = useState(props.make)
  const [year, setYear] = useState(props.year)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)

  const [updateCar] = useMutation(UPDATE_CAR)

  useEffect(() => {
    forceUpdate()
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = values => {
    const { year, model, make, price, personId } = values
    updateCar({
      variables: {
        id,
        year,
        model,
        make,
        price,
        personId
      }
    })
    props.onButtonClick()
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
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      initialValues={{
        model: model,
        make: make,
        year: year,
        price: price,
        personId: personId
      }}
    >
        <Form.Item
          name='year'
          rules={[{ required: true, message: 'Please input the year of the car!' }]}
        >
          <Input placeholder='Year' 
           onChange={e => updateStateVariable('year', e.target.value)}/>
        </Form.Item>
        <Form.Item
          name='make'
          rules={[{ required: true, message: 'Please input the make of the car!' }]}
        >
          <Input placeholder='Make' 
           onChange={e => updateStateVariable('make', e.target.value)}/>
        </Form.Item>
        <Form.Item
          name='model'
          rules={[{ required: true, message: 'Please input the model of the car!' }]}
        >
          <Input placeholder='Model' 
           onChange={e => updateStateVariable('model', e.target.value)}/>
        </Form.Item>
        <Form.Item
          name='price'
          rules={[{ required: true, message: 'Please input the price of the car!' }]}
        >
          <Input placeholder='Price' 
           onChange={e => updateStateVariable('price', e.target.value)}/>
        </Form.Item>
        
        <Form.Item
        name="personId"
        label="Person"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a person"
          onChange={e => updateStateVariable('personId', e.target.value)}
        >
          {data.people.map(({ id, firstName, lastName}) => (
          <Option value={id}>{firstName} {lastName}</Option>
       ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('model') && !form.isFieldTouched('make') && !form.isFieldTouched('year') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
