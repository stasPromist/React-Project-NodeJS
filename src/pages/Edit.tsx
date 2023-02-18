import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../services/apiService";
import { ICardData } from "./CardsList";



function Edit() {

    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [alt, setAlt] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const res = getRequest(`cards/${id}`);
        if (!res) return;
        res.then(res => res.json())
            .then(json => {
                if (json.ok === false) {
                    setError('error get the data');
                    return;
                }

                setTitle(json.title);
                setSubTitle(json.subTitle);
                setDescription(json.description);
                setAddress(json.address);
                setPhone(json.phone);
                setUrl(json.image.url);
                setAlt(json.image.alt);

            })
    }, [id]);



    function handleClick() {
        const schema = Joi.object().keys({
            title: Joi.string().min(2).max(256).required(),
            subTitle: Joi.string().min(2).max(256).required(),
            description: Joi.string().min(2).max(1024).required(),
            address: Joi.string().min(2).max(256).required(),
            phone: Joi.string().min(9).max(14).required(),
            image: {
                url: Joi.string().min(2).max(256).required(),
                alt: Joi.string().min(2).max(256).required(),

            }

        });

        const { error, value } = schema.validate({
            title,
            subTitle,
            description,
            address,
            phone,
            image: {
                url, alt
            }

        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        updateCard(value);

    }

    function updateCard(card: ICardData) {

        const res = patchRequest(
            `cards/${id}`,
            card
        );
        if (!res) return;


        res.then(res => res.json())
            .then(json => {
                if (json.error) {
                    setError(json.error);
                    return;
                }

                navigate('/cardslist')
            })


    }

    return (
        <>
            <div className="bg-light m-4">
                <div className="mb-3">
                    <label
                        className="form-label">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Location"
                    />
                </div>

                <div className="mb-3">
                    <label
                        className="form-label">
                        Business Subtitle
                    </label>
                    <input
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Location"
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="form-label">
                        Business description
                    </label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Price"
                    />
                </div>

                <div className="mb-3">
                    <label
                        className="form-label">
                        Business Address
                    </label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Price"
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="form-label">
                        Business Phone
                    </label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Price"
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="form-label">
                        Image
                    </label>
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Image"
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="form-label">
                        Alt
                    </label>
                    <input
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Alt"
                    />
                </div>

                <button
                    onClick={handleClick}
                    className="btn btn-info me-3"
                >
                    Update
                </button>

                <Link
                    to="/cardslist"
                    className="btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>

            {
                error &&
                <div className="text-danger">
                    {error}
                </div>
            }
        </>

    );
}

export default Edit;


