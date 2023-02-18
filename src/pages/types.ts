// export interface ICardData {
//     id: number;
//     title: string,
//     url: string
//     subTitle: string,
//     phone: string,
//     description: string,
//     address: number,
  
   
//     category: Categories;

// }
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

export enum Categories {
    all = "all",
    vegeterian = "Vegetarian",
    asian = 'Asian',
    chicken = "Chicken",
    Cat = 'Cat'
}