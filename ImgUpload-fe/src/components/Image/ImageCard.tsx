import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import imageApi from '../../api/imageApi';
import firebaseInstance from '../../services/firebase';


const image_placeholder = './src/assets/image_placeholder.svg'


export const ImageCard: () => JSX.Element = (): JSX.Element => {  

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    //const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [values, setValues] = useState({
      ImageName: '',
      ImageDes: '',
      ImageUrl: '',
      image: File,
    });
    const ImageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ImageInputRef.current) {
        ImageInputRef.current.value = '';
      }
    }, []);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    const resetForm = () => {
      setValues({ 
        ImageName: '', ImageDes: '', ImageUrl: '', image: File 
      });
      document.getElementById('imageInput')?.setAttribute('value', '');
      setSelectedImage(image_placeholder);
    };
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      if (file){     
        values.image = file;
        console.log(file);
        console.log(values.image); 
        const imageURL = URL.createObjectURL(file);
        console.log(imageURL);
        setSelectedImage(imageURL);
      }
    };

    const handleClick = async (event: ChangeEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (values.ImageName === '' || values.ImageDes === '' || values.image === null) {
        window.alert('Please fill in all fields');
      }
      else {
        const imageURL = values.image
          ? await firebaseInstance.storeImage('image',values.image)
          : null;
        console.log("Da chon tep:", imageURL);
        const image = {
          ImageName: values.ImageName,
          ImageDes: values.ImageDes,
          ImageUrl: imageURL,
        }; 
        await imageApi.uploadImage(image);
        resetForm();
      }
        
    };

    // useEffect(() => {
    //   const fetchImage = async () => {
    //     try {
    //       const response = await imageApi.getAllImage();
    //       console.log(response);
    //     }
    //     catch (error) {
    //       console.log(error);
    //     }
    //   };
      
    //   fetchImage();

    // },[]);

    console.log(values);
    console.log(values.image);


    return(
        <div className = 'max-w-sm text-center p-5 border border-gray-800 rounded-lg flex flex-col justify-center items-center'>
            <h3 className="text-lg font-bold ">Upload Image</h3>
            <div className = 'flex flex-col justify-center items-center'>
            <input
                type="file"
                ref={ImageInputRef}
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
                value={values.ImageName}
                onChange={handleInputChange}

            />
            <input 
                type = 'text'
                placeholder = 'Image Description'
                className = 'mt-4 px-2 py-3 w-full border rounded-md'
                name = 'ImageDes'
                value = {values.ImageDes}
                onChange = {handleInputChange}
            />
            <a href="#" className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick} >
              Upload
            </a>
            </div>
        </div>
    );
};