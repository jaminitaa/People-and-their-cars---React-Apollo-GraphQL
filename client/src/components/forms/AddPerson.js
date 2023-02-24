import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PEOPLE_WITH_CARS } from '../../queries'

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)
  
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
  
    useEffect(() => {
      forceUpdate([])
    }, [])
  
    const onFinish = values => {
      const { firstName, lastName } = values
  
      addPerson({
        variables: {
          id,
          firstName,
          lastName
        },
        update: (cache, { data: { addPerson } }) => {
          const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
          cache.writeQuery({
            query: GET_PEOPLE_WITH_CARS,
            data: {
              ...data,
              personWithCars: [...data.personWithCars, addPerson]
            }
          })
        }
      })
    }
  
    return (
      <div>
        <h2>Add Person</h2>
      <Form
        name='add-person-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder='Last Name' />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
      </div>
    )
  }
  
  export default AddPerson
  