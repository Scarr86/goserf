export default  interface Surfboard{
    style:string;
    rating:number;
    price:number;
    description:[string, string, string];
    extras:{
        name:string;
        logo:string;
        price:number;
    }[];
}