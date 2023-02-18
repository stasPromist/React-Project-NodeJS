import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import {  deleteRequest, getRequest, patchRequest } from "../services/apiService";
import { Categories } from "./types";

export interface ICardData {
    
    _id: number,
    title: string,
    subTitle: string,
    address: string,
    phone: string,
    bizNumber: string,
    image: {
        url: string,
        alt: string
    },
    category: Categories;
};

export interface UserUp {
    _id: number,
    arrCards: []
}

function CardsList() {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [cards, setCards] = useState<Array<ICardData>>([]);



    function getCards() {

        const res = getRequest(`cards/user/${context?.userName}`);
        console.log()

        if (!res) return;
        res.then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.error) {
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
                setCards(json);
            })
    }
    useEffect(getCards, []);

    function delCard(card: ICardData) {

        const res = deleteRequest(
            `cards/${card._id}`,
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                const updated = [...cards].filter(cardItem =>
                    cardItem._id !== card._id

                );
                setCards(updated)
            })
    }

    function moveTo(card: ICardData) {

        const res = patchRequest(
            `users/favCards/${card._id}`,
            { ...card, currentId: context?.userName }

        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {

                navigate('/myFavorCards');
            })
    }


    return (
        <>

            {





                cards.map(card =>
                    <div key={card._id}>
                        <div className="pb-5 ">
                            <div className="col p-5 d-flex justify-content-center  ">
                                <div className="card h-100 w-50 shadow-lg p-3 mb-5 bg-body rounded">
                                    <img src={card.image.url} className="card-img-top" alt={card.image.alt} />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title} </h5>
                                        <p className="card-text">{card.subTitle}</p>
                                        <p className="card-text">{card.address}</p>
                                        <p className="card-text">{card.phone}</p>
                                        <p className="card-text">{card.bizNumber}</p>
                                        <p className="card-text">{card.category}</p>

                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                        <Link
                                            to={`/edit/${card._id}`}

                                            className="btn btn-default"
                                        >
                                            <i className="bi-pen text-warning "></i>
                                        </Link>

                                        <button
                                            onClick={() => delCard(card)}
                                            className="btn btn-default ">
                                            <i className=" bi-trash text-danger"></i>
                                        </button>
                                        <Link

                                            to={`/oneCard/${card._id}`}
                                            className="btn btn-default text-primary"
                                        >

                                            <i className="bi bi-folder2-open"></i>
                                        </Link>
                                        <Link
                                            className="btn btn-default text-success"

                                            onClick={() => moveTo(card)}

                                            to={`/myFavorCards`}
                                        >
                                            <i className="bi bi-cloud-upload-fill pr-2"></i>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }

        </>
    );
}

export default CardsList;