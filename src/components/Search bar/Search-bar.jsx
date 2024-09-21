import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBar({ style, placeholder }) {
  return (
    <div style={style} className="flex justify-end mt-10">
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        className="w-[426px] h-[49px]"
      />
    </div>
  );
}
