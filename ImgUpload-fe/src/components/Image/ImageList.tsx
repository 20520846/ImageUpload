import { ImageCard } from "./ImageCard";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import firebaseInstance from '../../services/firebase';
import imageApi from "../../api/imageApi";

export const ImageList: () => JSX.Element = (): JSX.Element => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
          const res = await imageApi.getAllImage();
          setImages(res);
        };
        fetchImages();
    }, [images]);

    console.log(images);

    return(
        <div className = 'p'>
            <div className="w-full h-fit p-5 m-5" >
                <h1 className="text-3xl font-bold text-center">Image List</h1>
            </div>
            <div className="flex p-10">
                <div>
                    <ImageCard />
                </div>                
                

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