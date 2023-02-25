import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Select} from 'antd'
import { useMutation } from '@apollo/client'

import { GET_PEOPLE, ADD_CAR, GET_CARS } from '../../queries'
const { Option } = Select;

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const [form] = Form.useForm()

    const [, forceUpdate] = useState()
  
    useEffect(() => {
      forceUpdate([])
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE)
  
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
  
    const onFinish = values => {
      console.log(values)
      values.price = parseFloat(values.price)
      const { year, model, make, price, personId } = values
      addCar({
        variables: {
          id,
          year,
          model,
          make,
          price,
          personId
        },
        update: (cache, { data: { addCar } }) => {
          const data = cache.readQuery({ query: GET_CARS })
          console.log(data)
          cache.writeQuery({
            query: GET_CARS,
            data: {
              ...data,
              allcar: [...data.allcar, addCar]
            }
          })

        }
      })
    }
  
    return (
    <div>
    <h2>Add Car</h2>
      <Form
        name='add-car-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          name='year'
          rules={[{ required: true, message: 'Please input the year of the car!' }]}
        >
          <Input placeholder='Year' />
        </Form.Item>
        <Form.Item
          name='make'
          rules={[{ required: true, message: 'Please input the make of the car!' }]}
        >
          <Input placeholder='Make' />
        </Form.Item>
        <Form.Item
          name='model'
          rules={[{ required: true, message: 'Please input the model of the car!' }]}
        >
          <Input placeholder='Model' />
        </Form.Item>
        <Form.Item
          name='price'
          rules={[{ required: true, message: 'Please input the price of the car!' }]}
        >
          <Input placeholder='Price' />
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
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
    )
  }
  
  export default AddCar
  