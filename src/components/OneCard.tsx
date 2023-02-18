import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../services/apiService";
import Title from "./Title";
export interface ICardData {

    title: string,
    subTitle: string,
    description: string,
    address: string,
    phone: string,
    bizNumber: string,
    image: {
        url: string,
        alt: string
    }
    url: string
};

function OneCard() {
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
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
                setImage(json.image.url);

            })
    }, [id]);

    return (
        <>
            <Title
                main="Card details"
                sub="Here you will find business card"
            />
            <div className="pb-5 ">
                <div className="col p-3 d-flex justify-content-center  ">
                    <div className="card h-100 w-50 shadow-lg p-3 mb-5 bg-body rounded border border-warning  text-center">
                        <img src={image} className="card-img-top" alt='' />
                        <div className="card-body ">
                            <h5 className="card-title">Title: {title} </h5><hr></hr>
                            <p className="card-text">Subtitile: {subTitle}</p><hr></hr>
                            <p className="card-text">Description: {description}</p><hr></hr>
                            <p className="card-text">Address: {address}</p><hr></hr>
                            <p className="card-text">Phone: {phone}</p><hr></hr>

                        </div>


                        <Link
                            to="/cardslist"
                        >
                            <button

                                className="btn btn-info mt-2 "
                            >
                                Go Back
                            </button>
                        </Link>
                    </div>

                </div>
            </div>

        </>
    );
}

export default OneCard;