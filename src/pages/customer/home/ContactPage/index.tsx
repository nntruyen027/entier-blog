import { Button, Card, Form, Input, Select } from 'antd';
import { EditorField } from '~/components';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContactTypesStart } from '~/redux/contactType/slice';
import { createContactStart } from '~/redux/contact/slice';

const Page = () => {
  const [form] = Form.useForm();
  const { contactTypes } = useSelector((state: RootState) => state.contactType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactTypesStart({}));
  }, [dispatch]);

  const submitForm = (value) => {
    dispatch(createContactStart(value));
    form.resetFields(); // reset form sau khi gửi nếu cần
  };

  return (
    <div>
      <Card>
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            const selectedType = contactTypes.find((t) => t.id === values.typeId);
            submitForm({
              ...values,
              type: selectedType
            });
          }}
        >
          <Form.Item label='Tiêu đề' name='title'>
            <Input placeholder='Tiêu đề' autoFocus />
          </Form.Item>

          <Form.Item
            label='Chủ đề liên hệ'
            name='typeId'
            rules={[{ required: true, message: 'Vui lòng chọn chủ đề!' }]}
          >
            <Select
              className='text-left'
              showSearch
              placeholder='Chủ đề liên hệ'
              options={contactTypes.map((item) => ({
                label: item.name,
                value: item.id
              }))}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>

          <Form.Item label='Họ và tên người gửi' name='author'>
            <Input placeholder='Họ và tên người gửi' />
          </Form.Item>

          <Form.Item label='Số điện thoại liên hệ' name='phoneNumber'>
            <Input placeholder='Số điện thoại liên hệ' />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Nghề nghiệp' name='career'>
            <Input placeholder='Nghề nghiệp' />
          </Form.Item>

          <Form.Item label='Nội dung' name='content' rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
            <EditorField />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Gửi liên hệ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
