import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import {  deleteRequest, getRequest, patchRequest } from "../services/apiService";
import Title from "./Title";
export interface ICardData {
    _id: number,
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
};

function MyFavorCards() {
    // const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [bizNumber, setBizNumber] = useState<string>('');

    const { id } = useParams();

    const [cards, setCards] = useState<Array<ICardData>>([]);
  
    const context = useContext(AppContext);
   




    function getCards() {
        const currentId = context?.userName;

        const res = getRequest(`users/${currentId}/favCards`);

        if (!res) return
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
              

                setTitle(json.title);
                setSubTitle(json.subTitle);
                setDescription(json.description);
                setAddress(json.address);
                setPhone(json.phone);
                setImage(json.image);
                setBizNumber(json.bizNumber);
                setCards(json);
            })
            
    }

    useEffect(getCards, []);

    function delCardFavor(card: ICardData) {
     const res = patchRequest(`users/delFavCards/${card._id}`, {
           ...card, currentId:context?.userName,
     });
      
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                const updated = [...cards].filter(cardItem =>
                    cardItem._id !== card._id

                );
                setCards(updated);
            })
    }
   

    return (
        <>
            <Title
                main="My Favorite Card"
                sub="Here you will find business cards"
            />

            {
                cards.map(card =>
                    <div className="d-flex justify-content-center p-5 mb-5" key={id}>
                        <div className="card mb-3 m-5 g-4  w-50  ">
                            <div className="col">
                                <div className="card h-100 shadow-lg p-3 mb-5 bg-body rounded ">
                                    <img src={card.image.url} className="card-img-top" alt='' />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.subTitle}</p>
                                        <p className="card-text">{card.description}</p>
                                        <p className="card-text">{card.address}</p>
                                        <p className="card-text">{card.phone}</p>
                                        <p className="card-text">{card.bizNumber}</p>
                                    </div>
                                    
                                    <div className="card-footer">
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                        <button
                                            onClick={() => delCardFavor(card)}
                                            className="btn btn-default  text-danger">
                                            <i className=" bi-trash"></i>
                                        </button>
                                        <Link
                                    to="/cardslist"
                                >
                                    <button

                                        className="btn btn-info mt-2 float-end "
                                    >
                                        Go Back
                                    </button>
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

export default MyFavorCards;