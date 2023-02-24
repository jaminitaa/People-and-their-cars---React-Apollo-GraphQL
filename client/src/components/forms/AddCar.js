import { Button, Form, Input } from 'antd'


const AddCar = () => {
  
    const [form] = Form.useForm()

  
    return (
    <div>
    <h2>Add Car</h2>
      <Form
        name='add-car-form'
        form={form}
        layout='inline'
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
          <Input placeholder='Model' />
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
  