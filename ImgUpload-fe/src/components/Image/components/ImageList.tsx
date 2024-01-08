import { ImageCard } from "./ImageCard";
import { useEffect, useState } from "react";
import imageApi from "../../../api/imageApi";

export const ImageList: () => JSX.Element = (): JSX.Element => {
    const [images, setImages] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
          const res = await imageApi.getAllImage();
          setImages(res);
        };
        fetchImages();
    }, [images]);

    return(
        <div className = 'flex flex-col justify-center items-center mx-28 border border-t-gray-300 border-l-0 border-r-0 border-b-0'>
            <div className="flex py-5" >
                <h1 className="text-3xl font-bold text-center"></h1>
                <ImageCard />
            </div>
            <div className="flex">

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10">
                   {images.map((image) => (
                        <div key={image.id}>
                            <img className="h-[300px] w-[300px] rounded-lg border border-gray-800"
                                src={image.imageURL} 
                                alt="" />
                        </div>
                    
                   ))}
                </div>

            </div>
        </div>
    );
};