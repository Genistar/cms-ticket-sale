import { Timestamp } from "firebase/firestore";

export interface TicketType {
    stt: number;
    id?: string;
    ticketId: string;
    ticketNumber: number;
    status?: boolean | null;
    dateUsed?: Timestamp;
    dateOut?: Timestamp;
    dateExp?: Timestamp;
    checkIn: any;
    ticketPiece?: string;
    statusUse?: 'used' | 'unused' | 'exp';
    packageId?: string;
}
export interface packageType {
    id?: string,
    stt?: number,
    packageId?: string,
    packageName?: string,
    dateApply?: Timestamp,
    dateExp?: Timestamp,
    price: string,
    comboPrice: string,
    status?: boolean,
    nameEvent?: string,
}
