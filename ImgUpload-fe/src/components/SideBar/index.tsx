
import { Sidebar } from 'flowbite-react';
import { HiOutlineSearch, HiMail, HiUser  } from 'react-icons/hi';

export default function SideBar() {
  return (
    <Sidebar className=' h-screen sticky top-0 left-0 w-[300px]'>
    <Sidebar.Logo href='#' img=''>
        ImageUpload
    </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiOutlineSearch}>
            Search
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMail} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
