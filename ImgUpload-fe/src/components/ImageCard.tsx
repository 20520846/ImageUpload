import React, { ChangeEvent, useEffect, useState } from 'react';
import imageApi from '../api/imageApi';


const image_placeholder = './src/assets/image_placeholder.svg'


export const ImageCard: () => JSX.Element = (): JSX.Element => {  

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    //const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [values, setValues] = useState({
      ImageName: '',
      ImageDes: '',
      selectedFile: null,
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    const resetForm = () => {
      setValues({ ...values, ImageName: '', ImageDes: '', selectedFile: null });
      setSelectedImage(null);
    };
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
  
      if (file) {
        values.selectedFile = file;
        const reader = new FileReader(); 
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };       
        reader.readAsDataURL(file);
        console.log(values.selectedFile);
      }
    };

    const handleClick = async () => {
      if (values.selectedFile !== null && values.ImageName !== '' && values.ImageDes !== '') {
        try {
          await imageApi.uploadImage(values);
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

    useEffect(() => {
      const fetchImage = async () => {
        try {
          const response = await imageApi.getAllImage();
          console.log(response);
        }
        catch (error) {
          console.log(error);
        }
      };
      
      fetchImage();

    },[]);

    console.log(values);


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
                name='ImageName'
                onChange={(event) => handleInputChange(event)}

            />
            <input 
                type = 'text'
                placeholder = 'Image Description'
                className = 'mt-4 px-2 py-3 w-full border rounded-md'
                name = 'ImageDes'
                onChange = {(event) => handleInputChange(event)}
            />
            <a href="#" className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick} >
              Upload
            </a>
            </div>
        </div>
    );
};