import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Toolbar = ({ value, onChange }) => {
  return (
    <div className="toolbar">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={Toolbar.modules}
        formats={Toolbar.formats}
      />
    </div>
  );
};

Toolbar.modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

Toolbar.formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'align',
  'link',
  'image',
];

export default Toolbar;
