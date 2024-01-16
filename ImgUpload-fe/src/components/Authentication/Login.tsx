import LoginPic from "../../assets/LoginPic.svg";
import { TextInput, Button } from "flowbite-react";
import { HiUser, HiKey } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 flex justify-center items-center h-screen w-full">
            <div className=" bg-white w-3/4 border rounded-lg grid grid-cols-2">
                <img src={LoginPic}/>              
                <div className="p-3 mx-3 my-8 text-center">
                    <span className="text-3xl text-purple-500 font-bold">Login</span>
                    <div className="mt-5 p-5 flex flex-col justify-center items-center space-y-6">
                        <TextInput className="w-3/4 text-pink-500"
                            placeholder="Username"
                            icon={HiUser}
                            color="pink"
                            sizing="lg"
                        />
                        <TextInput className="w-3/4 text-pink-500"
                            placeholder="Password"
                            type="password"
                            icon={HiKey}
                            color="pink"
                            sizing="lg"
                        />
                        <Button className="w-3/4" 
                            gradientDuoTone="purpleToPink"
                            size="lg">
                            Login
                        </Button>
                        <span className="font-bold">Don't have an account? &nbsp; 
                            <span onClick={() => navigate('/register')} 
                                className="text-pink-500 cursor-pointer">
                                Register
                            </span>
                        </span>

                        <span className="font-semibold">May also log in with</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;