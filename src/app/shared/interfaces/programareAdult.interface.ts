import { Time } from "@angular/common";
import { Timestamp } from "@angular/fire/firestore";

export interface IProgramareAdult{
    nume_pacient: string;
    email: string;
    telefon: string;
    detalii: string;
    data: Date;
    ora: Time;
    clinica: string;
}