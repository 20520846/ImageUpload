import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import imageApi from '../../../api/imageApi';
import firebaseInstance from '../../../services/firebase';
const image_placeholder = './src/assets/image_placeholder.svg'
import { Modal, Button, FileInput, TextInput, Textarea } from "flowbite-react";
import {HiOutlineCamera} from 'react-icons/hi';


export const ImageCard: () => JSX.Element = (): JSX.Element => {

    const [openModal, setOpenModal] = useState(false);
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
      setOpenModal(false);

    };
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      if (file){     
        values.image = file;
        console.log(file); 
        const imageURL = URL.createObjectURL(file);
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

    return(
        <div className = 'flex flex-col items-center'>
          <Button className="" outline gradientDuoTone="purpleToPink" onClick={() => setOpenModal(true)}>
            <HiOutlineCamera className='w-6 h-6'/>
            <span className='ml-2'>Upload Image</span>
          </Button>
          <Modal show={openModal}
            onClose={() => setOpenModal(false)}
            size='3xl'>
            <Modal.Body className='grid grid-cols-2 space-x-5'>
              <div className='flex flex-col items-center'>
                <img
                  src={selectedImage ? selectedImage : image_placeholder}
                  alt="Selected"
                  className="w-full h-[300px] rounded-lg"
                />
                <FileInput className='w-full mt-2'
                  ref={ImageInputRef}
                  id="imageInput"
                  accept="image/*"              
                  onChange={handleImageChange}
                />

                
              </div>
              <div className='flex flex-col items-end'>
                <TextInput
                  sizing='lg'
                  placeholder="Image Name"
                  className="w-full"
                  name='ImageName'
                  value={values.ImageName}
                  onChange={handleInputChange}

                />
                <TextInput 
                  sizing='lg'
                  placeholder = 'Image Description'
                  className = 'w-full mt-2'
                  name = 'ImageDes'
                  value = {values.ImageDes}
                  onChange = {handleInputChange}
                />
                <Button className='mt-2' gradientDuoTone='purpleToPink' onClick={handleClick}>
                  Upload
                </Button>
              </div>
            </Modal.Body>
          </Modal>
            
        </div>
    );
};