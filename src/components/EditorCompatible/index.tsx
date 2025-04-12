import { Editor, EditorContentChanged } from '../Editor';

interface EditorFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

const EditorField = ({ value = '', onChange }: EditorFieldProps) => {
  const handleChange = (changes: EditorContentChanged) => {
    onChange?.(changes.html);
  };

  return <Editor value={value} onChange={handleChange} />;
};

export default EditorField;
