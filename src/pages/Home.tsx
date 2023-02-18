import { any } from "joi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AllCardsList from "../components/AllCardsList";
import ButtonBars from "../components/ButtonBars";
// import Cards from "../components/Cards";
import Title from "../components/Title";
import { getRequest } from "../services/apiService";
// import { data } from "./data";
import { ICardData } from "./CardsList";
// import { data } from "./data";
// import { data } from "./data";
import './Home.css';
import { Categories } from "./types";


// const data: any = [];

// function Home() {
//     const [cards, setCards] = useState<Array<ICardData>>([]);

//     function getCards() {

//         const res = getRequest(`cardsAll`);
//         console.log()

//         if (!res) return;
//         res.then(response => response.json())
//             .then(json => {
//                 console.log(json)
//                 if (json.error) {
//                     toast.error(json.error,
//                         {
//                             position: "top-center",
//                             autoClose: 5000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                         });
//                     return;
//                 }

//                 setCards(json);

//             })
//     }
//     useEffect(getCards, []);




//     const [display, setDisplay] = useState('grid');
//     const [search, setSearch] = useState<string>('');

//     function handleDisplayclick(displayMode: string) {
//         setDisplay(displayMode);
//     };


//     function handleSearch(value: string) {

//         const title = value.toLowerCase();
//         let result = [...data];

//         if (title.length > 0) {
//             result = [...data].filter(offer =>
//                 offer.location.toLowerCase().includes(title))
//         }
//         setCards(result);
//         setSearch(value);
//     }

//     return (
//         <>
//             {

//                 cards.map(card =>
//                     <div key={card._id}>
//                         <div className="mb-5 shadow-lg p-3 mb-5 bg-body rounded">
//                             <div className="col">
//                                 <div className="card h-100">
//                                     <img src={card.image.url} className="card-img-top" alt={card.image.alt} />
//                                     <div className="card-body">
//                                         <h5 className="card-title">{card.title}</h5>
//                                         <p className="card-text">{card.subTitle}</p>
//                                         <p className="card-text">{card.address}</p>
//                                         <p className="card-text">{card.phone}</p>
//                                         <p className="card-text">{card.bizNumber}</p>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }



//             <div className="m-4">

//                 <Title
//                     main="BUSINESS CARD APP"
//                     sub="Here you will find business cards"
//                 />
//                 <div className='m-3'>
//                     <div className="form-outline mt-5">
//                         <input type="search"
//                             value={search}
//                             onChange={(e) => handleSearch(e.target.value)}
//                             id="form1"
//                             className="form-control"
//                             placeholder="Enter business name or number"
//                             aria-label="Search" />
//                         {/* <select
//                     className="form-select"
//                     value={sort}
//                     onChange={(e) => handleSort(e.target.value)}
//                 >
//                     <option value={SortDirection.asc}>Location A-Z</option>
//                     <option value={SortDirection.desc}>Location Z-A</option>
//                 </select> */}



//                         {/* {
//                         offers.map(card => <AllCardsList
//                             key={card._id}
//                             {...card}
//                         />
//                         )
//                     } */}

//                     </div>


//                     <div className="mt-3">

//                         <button className="btn btn-light mx-1"
//                             onClick={(e) => handleDisplayclick('grid')}
//                         >
//                             <i className="bi-grid-3x3-gap-fill"></i>
//                         </button>
//                         <button className="btn btn-light "
//                             onClick={(e) => handleDisplayclick('list')}
//                         >
//                             <i className="bi-list-ul"></i>

//                         </button>
//                     </div>
//                 </div>
//                 {/* <div className={`${display} row row-cols-1 row-cols-md-3 g-4 mt-4`}>

//                     <AllCardsList />

//                 </div> */}

//             </div>
//         </>
//     );
// }


// const data:any = [<AllCardsList/>];

function Home() {
    const [cards, setCards] = useState<Array<ICardData>>([]);

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

    const data = cards;
  
    const [display, setDisplay] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState(Categories.all);
    const [filtered, setFiltered] = useState([...data]);
    const [search, setSearch] = useState('');
    

    function filterByCategory(category: Categories, cards: Array<ICardData>):
        Array<ICardData> {
        if (category === Categories.all) {
            return cards;
            
        }
        return cards.filter(card => card.category === category);
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Categories;
        categoryChange(value);
    }

    function categoryChange(value: Categories) {
        const filteredData = filterByCategory(value, [...data]);

        setSelectedCategory(value);
        setSearch('');
        setFiltered(filteredData);

    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        let result = [...data];

        if (value.length > 0) {
            const stripVal = value.trim().toLowerCase();
            result = [...data].filter(card =>
                card.title.toLowerCase().includes(stripVal)
            )
        }
        setSelectedCategory(Categories.all);
        setSearch(value);
        setFiltered(result);

    }

    return (

        <>
            <Title
                main="My Favorite Card"
                sub="Here you will find business cards"
            />
            <ButtonBars

                updateDisplay={setDisplay}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                search={search}
                handleSearch={handleSearch}
            />
            <div className={`${display} p-5`}>
                {/* {
                    cards.map(card =>
                        <AllCardsList
                            key={card._id}
                            {...card}
                            CategoryClick={categoryChange}

                        />
                    ) 

                    
                } */}

                {
                    filtered.length === 0 ? (
                        <>
                        <div>
                        <p>Sorry! No Result</p>
                        <img src="https://th.bing.com/th/id/R.be5ec6632b2c0809281656e1e51d5574?rik=i3v0SZdgyl%2fUAw&pid=ImgRaw&r=0" />
                        </div>
                        </>
                        
                    ) : (
                        filtered.map(card =>
                            <AllCardsList
                                key={card._id}
                                {...card}
                                CategoryClick={categoryChange}
                                
                            />
                        )
                    )
                }

            </div>
        </>
    );
}

export default Home;