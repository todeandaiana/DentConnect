import { IPrice } from "./price.interface";

export interface IService{
    nume:string;
    id_specializare:string;
    preturi: IPrice[];

}