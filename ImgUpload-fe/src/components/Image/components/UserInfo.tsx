


export const UserInfo: () => JSX.Element = (): JSX.Element => {
    return (
        <div className='flex justify-center items-center mb-10 space-x-8'>
            <div className="border border-gray-800 rounded-full">
                <img src="https://firebasestorage.googleapis.com/v0/b/imgupload-b1422.appspot.com/o/images%2F1704622037005?alt=media&token=c357a8b2-f597-40c3-b237-27ef145e170c"
                    className="w-[200px] h-[200px] rounded-full object-fill">               
                </img>
            </div>
            <div className='flex flex-col ml-2'>
                <span className='text-3xl font-semibold'>User</span>
                <span className='text-xl text-gray-500'>Description</span>
            </div>

        </div>
    );
};