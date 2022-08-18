import { packageType, TicketType } from "./ticket";

export interface defaultTicketState {
    loading: boolean;
    ticket: TicketType | null;
    tickets: TicketType[];
    ticketFilter: TicketType[];
    message: {
        text: string | undefined,
        fail: boolean
    }
}

export interface defaultPackageState {
    loading: boolean;
    package: packageType | null;
    packages: packageType[];
    packageFilter: packageType[];
    message: {
        text: string | undefined,
        fail: boolean
    }
}