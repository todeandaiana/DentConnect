import { Time } from "@angular/common";
import { Timestamp } from "@angular/fire/firestore";

export interface IProgramare{
    nume_pacient: string;
    tip:string;
    nume_insotitor:string;
    email: string;
    telefon: string;
    data: Date;
    ora: Time;
    clinica: string;
    specializare: string;
    serviciu: string;
    doctor: string;
    mesaj: string;
    status:string;
}