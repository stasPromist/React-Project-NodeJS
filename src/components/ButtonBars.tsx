import { useState } from "react";
import CardsList, { ICardData } from "../pages/CardsList";
import { Categories } from "../pages/types";
import AllCardsList from "./AllCardsList";
import Cards from "./Cards";

// enum SortDirection {
//     asc = 'asc',
//     desc = 'desc'
// }

// interface Props {
//     // updateDisplay: Function;
//     // selectedCategory: Categories;
//     // handleCategoryChange: (e :React.ChangeEvent<HTMLSelectElement>) => void;
//     search: string;
//     handleSearch: Function;
// }

// const data: any = [];
// function ButtonBars() {
//     const [offers, setOffers] = useState<Array<ICardData>>([]);

//     const [sort, setSort] = useState<SortDirection>(SortDirection.asc);
//     const [search, setSearch] = useState<string>('');

//     //     function handleSort(value: string) {
//     //         const direction = value as SortDirection;
//     //         setSort(direction)

//     //         let result = [...data];
//     //         if(direction === SortDirection.desc) {
//     //               result.sort((a,b) => 
//     //                    a.location > b.location ? -1 :
//     //                     a.location < b.location ? 1 :
//     //                     0
//     //               );
//     //         }
//     //        else {
//     //           result.sort((a,b) => 
//     //           a.location < b.location ? -1 :
//     //            a.location > b.location ? 1 :
//     //            0
//     //           );
//     //        }
//     //        setOffers(result);
//     //   }

//     function handleSearch(value: string) {
       
//         const term = value.toLowerCase();
//         let result = [...data];

//         if (term.length > 0) {
//             result = [...data].filter(offer =>
//                 offer.location.toLowerCase().includes(term))
//         }
//         setOffers(result);
//         setSearch(value);
//     }

//     return (
//         <>
//             <div className="form-outline mt-5">
//                 <input type="search"
//                     value={search}
//                     onChange={(e) => handleSearch(e.target.value)}
//                     id="form1"
//                     className="form-control"
//                     placeholder="Enter business name or number"
//                     aria-label="Search" />
//                 {/* <select
//                     className="form-select"
//                     value={sort}
//                     onChange={(e) => handleSort(e.target.value)}
//                 >
//                     <option value={SortDirection.asc}>Location A-Z</option>
//                     <option value={SortDirection.desc}>Location Z-A</option>
//                 </select> */}
               


//                 {
//                             offers.map(card => <AllCardsList 
//                                  key={card._id}
//                                  {...card}
//                                 />
//                                 )
//                         }
  
//             </div>

//         </>
//     );
// }

interface Props {
    updateDisplay: Function;
    selectedCategory: Categories;
    handleCategoryChange: (e :React.ChangeEvent<HTMLSelectElement>) => void;
    search: string;
    handleSearch: Function;
}







function ButtonBars({updateDisplay,selectedCategory,handleCategoryChange,search,handleSearch}: Props) {
    const catgories = Object.values(Categories);

    return ( 
        <>
        <div className="d-flex px-5">
                <button onClick={() => updateDisplay('grid')} className="btn btn-light mx-1">
                    <i className="bi-grid-3x3-gap-fill"></i>
                </button>
                <button onClick={() => updateDisplay('list')} className="btn btn-light ">
                    <i className="bi-list-ul"></i>

                </button>
                <div className="d-flex align-items-center">

                    <label className="mx-3">Category: </label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="form-select">
                        {
                            catgories.map(category =>
                                <option
                                    //это отправляется на сервер
                                    key={category}
                                    value={category}


                                >{category}</option>
                            )
                        }
                    </select>
                    <input
                        value={search}
                        onChange={(e) => handleSearch(e)}
                        placeholder="Search"
                        className="form-control ms-3"
                    ></input>
                </div>

            </div>
        </>
     );
}










export default ButtonBars;