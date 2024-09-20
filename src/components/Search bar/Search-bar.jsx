import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBar() {
  return (
    <div className="flex justify-end mt-10 pr-44">
      <Input
        placeholder="Search your CV"
        prefix={<SearchOutlined />}
        className="w-[426px] h-[49px]"
      />
    </div>
  );
}
