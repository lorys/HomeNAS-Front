import { Form, Input, Button, Checkbox } from "antd";

const HomeScreen = () => {
return (
    <div className={"container"}>
<Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={() => {}}
      onFinishFailed={() => {}}
    >
      <Form.Item
        label="mot de passe"
        name="password"
        rules={[{ required: true, message: 'Le mot de passe est obligatoire.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Me maintenir connecté</Checkbox>
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Connexion
        </Button>
      </Form.Item>
    </Form>
    </div>
  );   
}

export default HomeScreen;