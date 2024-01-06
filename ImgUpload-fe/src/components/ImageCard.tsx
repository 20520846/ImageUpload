import React, { ChangeEvent, useState } from 'react';
import imageApi from '../api/imageApi';


const image_placeholder = './src/assets/image_placeholder.svg'


export const ImageCard: () => JSX.Element = (): JSX.Element => {  
    const [imageName, setImageName] = useState<string>('');
    const [imageDescription, setImageDescription] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const IntialState = {
        imageName: '',
        imageDescription: '',
        selectedImage: '',
        selectedFile: null
    }
    const resetForm = () => {
        setImageName(IntialState.imageName);
        setImageDescription(IntialState.imageDescription);
        setSelectedImage(IntialState.selectedImage);
        setSelectedFile(IntialState.selectedFile);
    };
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        setSelectedFile(file);
  
        reader.readAsDataURL(file);
        console.log(file);
        console.log(selectedImage);
      }
    };


    const handleClick = async () => {
      if (selectedImage !== '' && imageName !== '' && imageDescription !== '') {
        try {
          await imageApi.uploadImage({
            ImageName: imageName,
            ImageDes: imageDescription,
            // selectedImage: selectedImage,
            file: selectedFile
          
          });

          resetForm();
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        alert('Please fill in all fields');
      }
    };

    return(
        <div className = 'max-w-sm text-center p-5 border border-gray-800 rounded-lg flex flex-col justify-center items-center'>
            <h3 className="text-lg font-bold ">Upload Image</h3>
            <div className = 'flex flex-col justify-center items-center'>
            <input
                type="file"
                id="imageInput"
                accept="image/*"              
                onChange={handleImageChange}
            />
            <img
                src={selectedImage ? selectedImage : image_placeholder}
                alt="Selected"
                className="mt-4 rounded-md shadow-md w-full border-none"
            />
            
            <input
                type="text"
                placeholder="Image Name"
                className="mt-4 px-2 py-3 w-full border rounded-md"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}

            />
            <input 
                type = 'text'
                placeholder = 'Image Description'
                className = 'mt-4 px-2 py-3 w-full border rounded-md'
                value = {imageDescription}
                onChange = {(e) => setImageDescription(e.target.value)}
            />
            <a href="#" className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick} >
              Upload
            </a>
            </div>
        </div>
    );
};