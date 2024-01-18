import { HiUser, HiKey } from "react-icons/hi";
import { TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import firebaseInstance from "../../services/firebase";
import userApi from "../../api/userApi";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        else {
            try {
                const res = await firebaseInstance.createAccount(email, password);
                console.log(res);
                const username = email.split('@')[0];
                const user = {
                    username: username,
                    email: email,
                };
                const response = await userApi.createUser(user);
                console.log(response);
                window.alert("Register successfully");
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 flex justify-center items-center h-screen w-full"> 
            <div className="bg-white round rounded-lg p-3 m-3 text-center w-1/3">
                <span className="text-3xl text-purple-500 font-bold">Register</span>
                <div className="mt-5 p-5 flex flex-col justify-center items-center space-y-6">
                    <TextInput className="w-3/4 text-pink-500"
                        type="email"
                        placeholder="Email"
                        icon={HiUser}
                        color="pink"
                        sizing="lg"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput className="w-3/4 text-pink-500"
                        placeholder="Password"
                        type="password"
                        icon={HiKey}
                        color="pink"
                        sizing="lg"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextInput className="w-3/4 text-pink-500"
                        placeholder="Confirm password"
                        type="password"
                        icon={HiKey}
                        color="pink"
                        sizing="lg"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button className="w-3/4" 
                        gradientDuoTone="purpleToPink"
                        size="lg"
                        onClick={handleRegister}>
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