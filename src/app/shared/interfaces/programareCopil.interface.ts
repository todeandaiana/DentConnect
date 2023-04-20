import { Time } from "@angular/common";

export interface IProgramareCopil{
    nume_pacient: string;
    varsta_pacient: string;
    nume_insotitor: string;
    email: string;
    telefon: string;
    detalii: string;
    data: Date;
    ora: Time;
    clinica: string;
    specializare: string;
    serviciu: string;
    doctor: string;
    mesaj: string;
}