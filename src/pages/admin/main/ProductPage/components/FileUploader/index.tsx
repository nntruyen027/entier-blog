import React, { useEffect, useState } from 'react';
import { FormInstance, message, Modal, Upload } from 'antd';
import { DeleteOutlined, FilePdfOutlined, FileWordOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';

const BASE_UPLOAD_URL = import.meta.env.VITE_FILE_SERVICE;

const getFilenameFromUrl = (url: string): string | null => {
  try {
    const parts = url.split('/');
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
};

const getFileExtension = (filename: string) => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

interface FileUploaderProps {
  value?: string;
  onChange?: (url?: string) => void;
  folder?: string;
  form?: FormInstance;
}

const FileUploader: React.FC<FileUploaderProps> = ({ value, onChange, folder = 'uploads', form }) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | undefined>(value);

  useEffect(() => {
    setFileUrl(value);
  }, [value]);

  const deleteFileFromServer = async (url?: string) => {
    const filename = url && getFilenameFromUrl(url);
    if (filename) {
      try {
        await fetch(`${BASE_UPLOAD_URL}/${filename}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Lỗi xoá file cũ:', err);
      }
    }
  };

  const beforeUpload = (file: RcFile) => {
    const allowedTypes = [
      'image/',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const isAllowed = allowedTypes.some((type) => file.type.startsWith(type));
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isAllowed) message.error('Chỉ cho phép ảnh, PDF, hoặc file Word!');
    if (!isLt10M) message.error('File phải nhỏ hơn 10MB!');

    return isAllowed && isLt10M;
  };

  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      const uploadedUrl = info.file.response?.files?.[0]?.url;
      if (uploadedUrl) {
        await deleteFileFromServer(fileUrl);
        setFileUrl(uploadedUrl);
        onChange?.(uploadedUrl);
        form?.setFieldsValue({ file: uploadedUrl });
      }
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xoá file này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      onOk: async () => {
        await deleteFileFromServer(fileUrl);
        setFileUrl(undefined);
        onChange?.(undefined);
        form?.setFieldsValue({ file: undefined });
        message.success('Đã xoá file');
      }
    });
  };

  const renderFilePreview = () => {
    if (!fileUrl) return null;

    const extension = getFileExtension(fileUrl);
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return <img src={fileUrl} alt='uploaded' style={{ width: '100%', objectFit: 'cover' }} />;
    }

    if (extension === 'pdf') {
      return (
        <div style={{ textAlign: 'center' }}>
          <FilePdfOutlined style={{ fontSize: 48, color: '#d32029' }} />
          <div>{getFilenameFromUrl(fileUrl)}</div>
        </div>
      );
    }

    if (['doc', 'docx'].includes(extension)) {
      return (
        <div style={{ textAlign: 'center' }}>
          <FileWordOutlined style={{ fontSize: 48, color: '#2b579a' }} />
          <div>{getFilenameFromUrl(fileUrl)}</div>
        </div>
      );
    }

    return <div>{getFilenameFromUrl(fileUrl)}</div>;
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
        {fileUrl ? renderFilePreview() : uploadButton}
      </Upload>

      {fileUrl && (
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
          title='Xoá file'
        />
      )}
    </div>
  );
};

export default FileUploader;
