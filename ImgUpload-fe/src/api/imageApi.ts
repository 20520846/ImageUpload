import axiosClient from "./axiosClient";

const imageApi = {
    getImageById: async (id: string) => {
        try {
            const url = "/image/getimage";
            const res = await axiosClient.get(url, {params: {id}});
            console.log(res.data.data);
            return res.data.data; 
        } catch (error) {
            console.log(error);
        }
    },

    getImageInfoById: async (id: string) => {
        try {
            const url = "/image/getimageinfo";
            const res = await axiosClient.get(url, {params: {id}});
            console.log(res.data.data);
            return res.data.data; 
        } catch (error) {
            console.log(error);
        }
    },

    getAllImageInfo: async () => {
        try {
            const url = "/image/getallimageinfo";
            const res = await axiosClient.get(url);
            console.log(res.data.data);
            return res.data.data; 
        } catch (error) {
            console.log(error);
        }
    },

    uploadImage: async (image: any) => {
        try {
            const url = "/image/uploadimage";
            const res = await axiosClient.post(url, image);
            console.log(res.data.data);
            return res.data.data; 
        } catch (error) {
            console.log(error);
        }
    },
};

export default imageApi;