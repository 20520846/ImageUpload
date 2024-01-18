import axiosClient from "../config/axiosClient";

const userApi = {
    getUserById: async (id: string) => {
        try {
            const url = "/user/getuser";
            const res = await axiosClient.get(url, {params: {id}});
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    getAllUser: async () => {
        try {
            const url = "/user/getalluser";
            const res = await axiosClient.get(url);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    createUser: async (user: any) => {
        try {
            const url = "/user/create";
            const res = await axiosClient.post(url, user);
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (user: any) => {
        try {
            const url = "/user/update";
            const res = await axiosClient.put(url, user);
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (id: string) => {
        try {
            const url = "/user/delete";
            const res = await axiosClient.delete(url, {params: {id}});
            console.log(res.data);
            return res.data; 
        } catch (error) {
            console.log(error);
        }
    },
};

export default userApi;