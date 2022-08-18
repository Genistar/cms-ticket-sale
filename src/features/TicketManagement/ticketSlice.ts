import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Filter } from "../../interface/filter";
import { defaultTicketState } from "../../interface/intialState";
import { TicketType } from "../../interface/ticket";
import { RootState } from "../../store";

const initialState: defaultTicketState = {
    loading: false,
    ticket: null,
    tickets: [],
    ticketFilter: [],
    message: {
        text: '',
        fail: false
    }
}

export const getAll = createAsyncThunk('tickets/getAll',
    async (filter?: Filter) => {
        let tickets: TicketType[] = [];

        const queryTicket = await getDocs(collection(db, 'tickets'));
        queryTicket.forEach((value) => {
            tickets.push({
                id: value.id,
                ...(value.data() as TicketType)
            })
        })
        if (filter) {
            if (filter.keywords != '') {
                tickets = tickets.filter(
                    (ticket) =>
                        ticket.ticketId.toLowerCase().includes(filter.keywords?.toLowerCase()) ||
                        ticket.ticketNumber.toString().includes(filter.keywords)
                )
            }
        }
        tickets.reverse();
        return tickets;
    }
)

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.tickets = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
})

const ticketReducer = ticketSlice.reducer;

export const ticketSelector = (state: RootState) => state.ticketReducer;

export default ticketReducer;