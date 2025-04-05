import { useEffect, useState } from 'react';

interface FileItem {
  name: string;
  isDirectory: boolean;
  size: number;
  url: string | null;
}

const FILE_SERVICE = import.meta.env.VITE_FILE_SERVICE;

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folder, setFolder] = useState('');

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${FILE_SERVICE}/files?folder=${folder}`);
      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [folder]);

  const uploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line no-unsafe-optional-chaining
    for (const file of event?.target?.files) {
      formData.append('files', file);
    }
    formData.append('folder', folder);

    await fetch(`${FILE_SERVICE}/`, { method: 'POST', body: formData });
    fetchFiles();
  };

  const deleteFile = async (name: string) => {
    await fetch(`${FILE_SERVICE}/${folder}${name}`, { method: 'DELETE' });
    fetchFiles();
  };

  const createFolder = async () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      await fetch(`${FILE_SERVICE}/folder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: `${folder}/${folderName}` })
      });
      fetchFiles();
    }
  };

  const deleteFolder = async (name: string) => {
    await fetch(`${FILE_SERVICE}/folder/${folder}${name}`, { method: 'DELETE' });
    fetchFiles();
  };

  const goBack = () => {
    const pathParts = folder.split('/');
    pathParts.pop();
    setFolder(pathParts.join('/'));
  };

  return (
    <div className='p-4 max-w-xl mx-auto bg-white shadow-lg rounded-lg'>
      <div className='flex gap-2 mb-4'>
        <input type='file' multiple onChange={uploadFiles} className='border p-2' />
        <button onClick={createFolder} className='px-4 py-2 bg-blue-500 text-white rounded'>
          New Folder
        </button>
        {folder && (
          <button onClick={goBack} className='px-4 py-2 bg-gray-500 text-white rounded'>
            Back
          </button>
        )}
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.name} className='flex justify-between items-center p-2 border-b'>
            {file.isDirectory ? (
              <span className='font-bold cursor-pointer' onClick={() => setFolder(`${folder}/${file.name}`)}>
                📁 {file.name}
              </span>
            ) : (
              <a href={file.url || '#'} target='_blank' rel='noopener noreferrer' className='text-blue-600'>
                📄 {file.name}
              </a>
            )}
            <button
              onClick={() => (file.isDirectory ? deleteFolder(file.name) : deleteFile(file.name))}
              className='text-red-500'
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
