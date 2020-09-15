//MODELO DE INTERFACE DOS ATRIBUTOS DO USER
export interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    zip_code?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: number;
    complement?: string;
    phone?: string;
    role?: string; // user ou admin
    createdAt?: any;
 }

