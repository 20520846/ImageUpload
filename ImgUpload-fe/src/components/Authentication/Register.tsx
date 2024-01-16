import { HiUser, HiKey } from "react-icons/hi";
import { TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 flex justify-center items-center h-screen w-full"> 
            <div className="bg-white round rounded-lg p-3 m-3 text-center w-1/3">
                <span className="text-3xl text-purple-500 font-bold">Register</span>
                <div className="mt-5 p-5 flex flex-col justify-center items-center space-y-6">
                    <TextInput className="w-3/4 text-pink-500"
                        placeholder="Username"
                        icon={HiUser}
                        color="pink"
                        sizing="lg"
                        required
                    />
                    <TextInput className="w-3/4 text-pink-500"
                        placeholder="Password"
                        type="password"
                        icon={HiKey}
                        color="pink"
                        sizing="lg"
                        required
                    />
                    <TextInput className="w-3/4 text-pink-500"
                        placeholder="Confirm password"
                        type="password"
                        icon={HiKey}
                        color="pink"
                        sizing="lg"
                        required
                    />
                    <Button className="w-3/4" 
                        gradientDuoTone="purpleToPink"
                        size="lg">
                        Register
                    </Button>
                    <span className="font-bold">Already have an account? &nbsp;
                        <span onClick={() => navigate('/login')} 
                            className="text-pink-500 cursor-pointer">
                            Login
                        </span>
                    </span>

                </div>
            </div>
        </div>
    );
};

export default Register;