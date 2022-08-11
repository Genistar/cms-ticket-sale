export interface TicketType {
    stt: number;
    ticketId: string;
    ticketNumber: number;
    status: boolean | null;
    dateUse: string;
    dateOut: string;
    checkIn: string;
    name?: string;
}[]
export interface packageType {
    stt: number,
    packageId: string,
    name: string,
    dateApply: string,
    dateExp: string,
    price: string,
    comboPrice: string,
    status: boolean,
}
