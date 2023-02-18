import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken, setToken } from "../Auth/Token";
import { postRequest } from "../services/apiService";
import Title from "./Title";

export interface ICardData {
    title: string,
    subTitle: string,
    description: string,
    address: StaticRangeInit,
    phone: string,
    url: string
    category: string

}

function Businesscard() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    function submit() {
        console.log('hello');
        const schema = Joi.object().keys({
            title: Joi.string().min(2).max(256).required(),
            subTitle: Joi.string().min(2).max(256).required(),
            description: Joi.string().min(2).max(1024).required(),
            address: Joi.string().min(2).max(256).required(),
            phone: Joi.string().min(9).max(14).required(),
            url: Joi.string().min(2).max(256).required(),
            category: Joi.string().min(2).max(256).required(),

        });

        const { error, value } = schema.validate({
            title,
            subTitle,
            description,
            address,
            phone,
            url,
            category

        });
        if (error) {
            console.log('ededde');
            console.log(error.message);
            return;
        }

        register(value);
    }



    function register(data: ICardData) {

        const res = postRequest(
            'cards',
            data,
            true,
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {

                if (json.error) {

                    setToken(json.token);

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
                navigate('/cardslist')
            })

    }
    return (
        <>
            <div className="p-3 form-max-w m-auto">
                <Title main="Business Registration Form"
                    sub="Open business card"
                />
                <div className="mb-3">
                    <label htmlFor="basic-name" className="form-label">Title</label>
                    <input
                        id="basic-name"
                        type="text"
                        className="form-control"
                        placeholder="Biz Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-name" className="form-label">Subtitle</label>
                    <input
                        id="basic-name"
                        type="text"
                        className="form-control"
                        placeholder="Biz Name"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-description" className="form-label">Business Description</label>
                    <input
                        id="basic-description"
                        type="text"
                        className="form-control"
                        placeholder="Business Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-address" className="form-label">Business Address</label>

                    <input
                        id="basic-address"
                        type="text"
                        className="form-control"
                        placeholder="Business Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-phone" className="form-label">Business Phone</label>
                    <input
                        id="basic-phone"
                        type="text"
                        className="form-control"
                        placeholder="03-9344455"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-image" className="form-label">Business Image</label>
                    <input
                        id="basic-image"
                        type="text"
                        className="form-control"
                        placeholder="Image"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="basic-phone" className="form-label">Category</label>
                    <input
                        id="basic-phone"
                        type="text"
                        className="form-control"
                        placeholder="03-9344455"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></input>
                </div>

                <button
                    onClick={submit}
                    className="btn btn-primary bng-lg">
                    Create Card
                </button>
            </div>
        </>
    );
}

export default Businesscard;