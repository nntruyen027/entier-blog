import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ versionName, price, images }: { versionName: string; price: number; images: string }) => void;
  value?: {
    id: number;
    versionName: string;
    price: number;
    images: any[];
    stockQuantity: number;
  };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [versionName, setVersionName] = useState('');
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [oldImages, setOldImages] = useState<any[]>([]); // Ảnh cũ không cần gửi lại
  const { t } = useTranslation();

  useEffect(() => {
    if (value && open) {
      setVersionName(value.versionName || '');
      setPrice(value.price || 0);
      console.log(value);

      const existingFiles =
        value.images?.map((image: { id: number; name: string; url: string }) => {
          console.log(image);
          return {
            id: image.id,
            name: image.name,
            url: image.url,
            preview: image.url,
            imageUrl: image.url
          };
        }) || [];

      setOldImages(existingFiles);
      setFiles(existingFiles);
    }
  }, [value, open]);

  const updateFiles = async (incomingFiles: any[]) => {
    if (incomingFiles.length === 0) return;

    try {
      const newFiles = incomingFiles.filter((fileObj) => {
        return !files.some((file) => file.name === fileObj?.name);
      });

      const uploadedFiles = await Promise.all(
        newFiles.map(async (fileObj, index) => {
          const formData = new FormData();
          formData.append('files', fileObj.file);

          const response = await fetch(import.meta.env.VITE_FILE_SERVICE, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`Upload failed for ${fileObj.file.name}`);
          const data = await response.json();

          return {
            id: Date.now(), // ID tạm thời
            name: fileObj.file.name,
            url: data.files[0].url,
            preview: data.files[0].url,
            imageUrl: data.files[0].url
          };
        })
      );
      console.log(uploadedFiles);

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...uploadedFiles];
        triggerSave(updatedFiles); // Lưu thay đổi ngay lập tức
        return updatedFiles;
      });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const removeFile = async (id: number) => {
    const fileToDelete = files.find((file) => file.id === id);
    if (!fileToDelete) return;

    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);
      triggerSave(updatedFiles);
      return updatedFiles;
    });

    // Chỉ xóa ảnh nếu là ảnh mới upload
    if (!oldImages.some((img) => img.id === id)) {
      try {
        await fetch(`${import.meta.env.VITE_FILE_SERVICE}/${fileToDelete.url.split('/').pop()}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const triggerSave = (updatedFiles: any[]) => {
    onSave({
      versionName,
      price,
      images: JSON.stringify(updatedFiles)
    });
    setOpen(true);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('edit', { value: t('product') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full gap-3'>
            <TextField
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              fullWidth
              size='small'
              label={t('name')}
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
              fullWidth
              size='small'
              type='number'
              label={t('price')}
            />
          </div>
          <Dropzone
            onChange={updateFiles}
            value={files}
            accept='image/*'
            maxFileSize={100 * 1024 * 1024}
            maxFiles={10}
            actionButtons={{ uploadButton: {}, abortButton: {} }}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={() => removeFile(file.id)} info preview />
            ))}
          </Dropzone>
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button
            variant='outlined'
            onClick={() => {
              triggerSave(files);
              setOpen(false);
            }}
          >
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
