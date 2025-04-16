import React, { useEffect, useState } from 'react';
import { FormInstance, message, Modal, Upload } from 'antd';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';

const BASE_UPLOAD_URL = import.meta.env.VITE_FILE_SERVICE; // đổi nếu API chạy port khác

const getFilenameFromUrl = (url: string): string | null => {
  try {
    const parts = url.split('/');
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
};

interface AvatarUploaderProps {
  value?: string;
  onChange?: (url?: string) => void;
  folder?: string;
  form?: FormInstance;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ value, onChange, folder = 'avatars', form }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const deleteFileFromServer = async (url?: string) => {
    const filename = url && getFilenameFromUrl(url);
    if (filename) {
      try {
        await fetch(`${BASE_UPLOAD_URL}/${filename}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Lỗi xoá ảnh cũ:', err);
      }
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage) message.error('Chỉ cho phép file ảnh!');
    if (!isLt5M) message.error('Ảnh phải nhỏ hơn 5MB!');

    return isImage && isLt5M;
  };

  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      const uploadedUrl = info.file.response?.files?.[0]?.url;
      if (uploadedUrl) {
        await deleteFileFromServer(imageUrl); // Xoá ảnh cũ
        setImageUrl(uploadedUrl);
        onChange?.(uploadedUrl);
        form?.setFieldsValue({ avatar: uploadedUrl });
      }
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xoá ảnh này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      onOk: async () => {
        await deleteFileFromServer(imageUrl);
        setImageUrl(undefined);
        onChange?.(undefined);
        form?.setFieldsValue({ avatar: undefined });
        message.success('Đã xoá ảnh');
      }
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: 104 }}>
      <Upload
        name='files'
        listType='picture-card'
        showUploadList={false}
        action={`${BASE_UPLOAD_URL}/`}
        data={{ folder }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%', objectFit: 'cover' }} /> : uploadButton}
      </Upload>

      {imageUrl && (
        <DeleteOutlined
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            fontSize: 16,
            color: 'red',
            cursor: 'pointer',
            background: '#fff',
            borderRadius: '50%',
            padding: 4,
            boxShadow: '0 0 4px rgba(0,0,0,0.2)'
          }}
          title='Xoá ảnh'
        />
      )}
    </div>
  );
};

export default AvatarUploader;
