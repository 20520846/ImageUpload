import { Modal } from "flowbite-react";
import {HiCamera, HiPencil} from 'react-icons/hi';

function ImageModal(props){
    const {openModal, setOpenModal, image} = props;

    return(
        <Modal size='5xl' className="w-full h-full"
            show={openModal} 
            onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h1 className="text-3xl font-bold text-center">{image.imageName}</h1>
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-2">
                    <img className='w-[500px] h-[400px] rounded-lg border border-gray-800'
                        src={image.imageURL}                   
                    />
                    <div className=" px-4 flex flex-col justify-start items-start">
                        <div className="flex">
                            <HiCamera className='w-8 h-8 text-pink-500'/>
                            <span className='ml-2 text-2xl text-pink-500 font-bold'>{image.imageName}</span>
                        </div>
                        <div className="flex">
                            <HiPencil className='w-6 h-6'/>
                            <span className='ml-3 text-lg '>{image.imageDes}</span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ImageModal;