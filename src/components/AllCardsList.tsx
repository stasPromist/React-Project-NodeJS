import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import { setToken } from "../Auth/Token";
import { ICardData } from "../pages/CardsList";
import { getRequest, patchRequest, postRequest } from "../services/apiService";

export interface Props {
    title: string,
    subTitle: string,

    address: string,
    phone: string,
    image: {
        url: string,
        alt: string
    },
    category: string,
    CategoryClick: Function;



};


// export interface ICardData {
//     _id: string,
//     title: string,
//     subTitle: string,
//     description: string,
//     address: StaticRangeInit,
//     phone: string,
//     url: string

// }

function AllCardsList({ title, subTitle, address, phone, image: { url, alt }, category, CategoryClick }: Props) {
    const context = useContext(AppContext);
    const isLoggedIn = context !== null && context.userName.length > 0;
    const [cards, setCards] = useState<Array<ICardData>>([]);
    const navigate = useNavigate();

    function getCards() {

        const res = getRequest(`cardsAll`);
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

          




            {/* {

                cards.map(card =>
                    <div key={card._id}> */}

    
            <div className="mb-5 shadow-lg p-3 mb-5 bg-body rounded">
                <div className="col">
                    <div className="card h-100">
                        <img src={url} className="card-img-top" alt={alt} />
                        <div className="card-body">
                            {/* <div className="badge text-bg-info"
                                            onClick={(e) => CategoryClick(title)}
                                        >{title}</div> */}
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{subTitle}</p>
                            <p className="card-text">{address}</p>
                            <p className="card-text">{phone}</p>
                            {/* <p className="card-text">{category}</p> */}
                        </div>
                        {

                            isLoggedIn &&
                            <Link

                                onClick={() => moveTo}
                                to={`/myFavorCards`}

                            >

                                <i className="bi bi-cloud-upload-fill"></i>
                            </Link>
                        }
                    </div>
                </div>
            </div>
             
            {/* </div>
                )
            } */}
       
        </>
    );
}

export default AllCardsList;