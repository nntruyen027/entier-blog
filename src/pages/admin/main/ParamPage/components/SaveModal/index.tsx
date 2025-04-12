import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { JsonEditor } from 'json-edit-react';
import { useEffect, useState } from 'react';

const dataTypes = ['string', 'number', 'boolean', 'json', 'array'];

interface SaveModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  form: any;
  onSave: (values: any) => void;
  editingParam: any;
}

const SaveModal: React.FC<SaveModalProps> = ({ isModalOpen, onCancel, form, onSave, editingParam }) => {
  const isEditing = !!editingParam;

  const [dataType, setDataType] = useState('string');
  const [jsonValue, setJsonValue] = useState({});
  const [arrayInput, setArrayInput] = useState<string>('');

  useEffect(() => {
    if (editingParam) {
      const currentType = editingParam.dataType || 'string';
      setDataType(currentType);

      if (currentType === 'json') {
        try {
          const parsed = typeof editingParam.value === 'string' ? JSON.parse(editingParam.value) : editingParam.value;
          setJsonValue(parsed || {});
        } catch (e) {
          setJsonValue({});
        }
      }

      if (currentType === 'array') {
        try {
          const arr = Array.isArray(editingParam.value) ? editingParam.value : JSON.parse(editingParam.value);
          setArrayInput(JSON.stringify(arr, null, 2));
        } catch (e) {
          setArrayInput('[]');
        }
      }

      form.setFieldsValue({
        ...editingParam,
        value: currentType === 'json' || currentType === 'array' ? undefined : editingParam.value
      });
    } else {
      setDataType('string');
      setJsonValue({});
      setArrayInput('');
      form.resetFields();
    }
  }, [editingParam]);

  const handleFinish = (values: { key: string; dataType: string; value: any }) => {
    let finalValue: any = values.value;

    try {
      if (dataType === 'json') {
        finalValue = jsonValue;
      } else if (dataType === 'array') {
        const parsed = JSON.parse(arrayInput);
        if (!Array.isArray(parsed)) throw new Error('Giá trị không phải mảng!');
        finalValue = parsed;
      } else if (dataType === 'number') {
        const num = Number(values.value);
        if (isNaN(num)) throw new Error('Giá trị không phải là số!');
        finalValue = num;
      }

      onSave({ ...values, value: finalValue });
    } catch (e: any) {
      form.setFields([
        {
          name: 'value',
          errors: [e.message || 'Giá trị không hợp lệ']
        }
      ]);
    }
  };

  return (
    <Modal
      title={isEditing ? 'Cập nhật tham số' : 'Thêm tham số mới'}
      open={isModalOpen}
      centered
      destroyOnClose
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item label='Khóa (key)' name='key' rules={[{ required: true, message: 'Vui lòng nhập key!' }]}>
          <Input placeholder='VD: maxLoginAttempts, featureToggle...' />
        </Form.Item>

        <Form.Item
          label='Kiểu dữ liệu'
          name='dataType'
          rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu!' }]}
        >
          <Select placeholder='Chọn kiểu dữ liệu' onChange={(val) => setDataType(val)} disabled={isEditing}>
            {dataTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {dataType === 'json' ? (
          <Form.Item label='Giá trị (JSON)' required>
            <JsonEditor data={jsonValue} setData={setJsonValue} className='w-full' minWidth='100%' />
          </Form.Item>
        ) : dataType === 'array' ? (
          <>
            <Form.Item name='value' noStyle>
              <Input type='hidden' />
            </Form.Item>
            <Form.Item label='Giá trị (Array JSON)' required>
              <Input.TextArea
                rows={5}
                value={arrayInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setArrayInput(val);
                  form.setFieldValue('value', val);
                }}
                placeholder='["a", "b", "c"]'
              />
            </Form.Item>
          </>
        ) : dataType === 'boolean' ? (
          <Form.Item label='Giá trị' name='value' rules={[{ required: true, message: 'Vui lòng chọn giá trị!' }]}>
            <Select placeholder='Chọn giá trị'>
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>
        ) : dataType === 'number' ? (
          <Form.Item label='Giá trị' name='value' rules={[{ required: true, message: 'Vui lòng nhập số!' }]}>
            <InputNumber className='w-full' placeholder='VD: 10, 3.14' />
          </Form.Item>
        ) : (
          <Form.Item label='Giá trị' name='value' rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}>
            <Input placeholder='Nhập giá trị tham số' />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default SaveModal;
