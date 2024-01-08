import { ImageList } from "./components/ImageList";
import { UserInfo } from "./components/UserInfo";

export default function Image(): JSX.Element {
    return (
        <div className='p-5 w-full'>
            <UserInfo />
            <ImageList />
        </div>
    );
}