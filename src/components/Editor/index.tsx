import { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import { htmlToMarkdown } from '~/utils/parser';
import quillEmoji from 'quill-emoji';
import './index.css';
import ImageResize from 'quill-image-resize-module-react';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
  {
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
    'modules/imageResize': ImageResize
  },
  true
);

const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'times-new-roman', 'courier-new', 'tahoma', 'verdana', 'roboto'];
Quill.register(Font, true);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

export function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(props.value || '');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const reactQuillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  // Khi render xong giá trị value, patch lại style ảnh nếu thiếu
  useEffect(() => {
    if (reactQuillRef.current) {
      const editor = reactQuillRef.current.getEditor();
      const imgs = editor.root.querySelectorAll('img');
      imgs.forEach((img) => {
        if (!img.style.width) {
          img.style.width = '300px';
          img.style.height = 'auto';
        }
      });
    }
  }, [value]);

  const extractImageUrls = (html: string): string[] => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const imgs = div.getElementsByTagName('img');
    return Array.from(imgs).map((img) => img.getAttribute('src') || '');
  };

  const onChange = (content: string) => {
    setValue(content);
    const newImageUrls = extractImageUrls(content);
    const removedUrls = imageUrls.filter((url) => !newImageUrls.includes(url));
    removedUrls.forEach((url) => {
      deleteFromCloudinary(url);
    });
    setImageUrls(newImageUrls);
    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content)
      });
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append('files', file);
    try {
      const response = await fetch(import.meta.env.VITE_FILE_SERVICE, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      return data.files[0].url;
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const deleteFromCloudinary = async (url: string) => {
    const filename = url.split('/').pop();
    try {
      const response = await fetch(`${import.meta.env.VITE_FILE_SERVICE}/${filename}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Delete failed');
      console.log(`Deleted image: ${url}`);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        if (url) {
          const quill = reactQuillRef.current;
          if (quill) {
            const editor = quill.getEditor();
            const range = editor.getSelection();
            const index = range ? range.index : 0;
            editor.insertEmbed(index, 'image', url);
            setImageUrls((prev) => [...prev, url]);
          }
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: ['1', '2', '3', '4', '5', '6'] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { script: 'sub' },
          { script: 'super' }
        ],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['emoji'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false
    },
    'emoji-toolbar': true,
    'emoji-textarea': true,
    'emoji-shortname': true,
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
    'color',
    'background',
    'emoji'
  ];

  return (
    <div className='w-full'>
      <ReactQuill
        className='w-full'
        ref={reactQuillRef}
        theme='snow'
        placeholder='Start writing...'
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Editor;
