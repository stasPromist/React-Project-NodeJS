import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../services/apiService";
import Title from "./Title";

interface ISignupData {
    name: string,
    email: string,
    password: string,
    // isBiz?: Boolean,
}


function Business() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    // const [isBiz, setIsBiz] = useState<boolean>(true);


    function submit() {
        const schema = Joi.object().keys({
            name: Joi.string().required().min(2).max(256),
            email: Joi.string().required().min(6).max(256).email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(30),
            isBiz: Joi.boolean().required()

        });

        const { error, value } = schema.validate({
            name,
            email,
            password,
            isBiz: true
        });
        if (error) {
            // setError(error.message);
            console.log(error.message)
            return;
        }

        register(value)
    }

    function register(data: ISignupData) {
        const res = postRequest(
            'users/signup',
            data,
            false,   
        );
        if(!res) return;
       
            res.then(response => response.json())
            .then(json => {
                if(json.error) {
                    toast.error(json.error,
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            });
                    return;
                }
                setUserName(name)
                navigate('/signin')
            })
    
    }
    return ( 
        
        <div className="p-3 form-max-w m-auto">
           <Title main="Sign up"
               sub="register to the application"
           />
           <div className="mb-3">
               <input
                   type="text"
                   className="form-control"
                   placeholder="Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               ></input>
           </div>
           <div className="mb-3">
               <input
                   type="email"
                   className="form-control"
                   placeholder="Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
               ></input>
           </div>
           <div className="mb-3">
               <input
                   type="password"
                   className="form-control"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
               ></input>
           </div>
           {/* <div className="form-check mt-4">
               <input
                   type="checkbox"
                   className="form-check-input"
                   placeholder="isBix"
                   checked={isBiz}
                   onChange={() => setIsBiz(!isBiz)}
               ></input>
           </div> */}
           <button
               onClick={submit}
               className="btn btn-primary bng-lg">
               Sign Up
           </button>
       </div>

    );

}
export default Business;