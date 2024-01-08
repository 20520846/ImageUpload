import axiosClient from "../config/axiosClient";

const imageApi = {
    getImageById: async (id: string) => {
        try {
            const url = "/image/getimage";
            const res = await axiosClient.get(url, {params: {id}});
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    getAllImage: async () => {
        try {
            const url = "/image/getallimage";
            const res = await axiosClient.get(url);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    uploadImage: async (image: any) => {
        try {
            const url = "/image/upload";
            const res = await axiosClient.post(url, image);
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    updateImage: async (image: any) => {
        try {
            const url = "/image/update";
            const res = await axiosClient.put(url, image);
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },
};

export default imageApi;