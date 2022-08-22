import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { collection, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import moment from "moment";
import { db } from "../../config/firebase";
import { iFilter, modalFilter } from "../../interface/filter";
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
    async ({ filter, modalFilter }: { filter?: iFilter; modalFilter?: modalFilter }) => {
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
        if (modalFilter) {
            tickets = tickets.filter((ticket) => {
                if (modalFilter.statusUse != undefined && modalFilter.statusUse !== ticket.statusUse)
                    return false
                if (modalFilter.status != undefined && modalFilter.status != null && modalFilter.status !== ticket.status)
                    return false;
                if (modalFilter.checkedList?.length != 5 && modalFilter.checkedList?.includes(ticket.checkIn) === false)
                    return false
                if (modalFilter.to != null && modalFilter.from != null) {
                    const dateProvider = moment(ticket.dateUsed?.toDate());
                    if (
                        modalFilter.from &&
                        !moment(modalFilter.from).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        modalFilter.to &&
                        !moment(modalFilter.to).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
            console.log(tickets)
            // if (modalFilter.checkedList?.length != 5) {
            //     tickets = tickets.filter((ticket) => modalFilter.checkedList?.includes(ticket.checkIn))
            // }
            // if (modalFilter.statusUse != undefined) {
            //     tickets = tickets.filter((ticket) => modalFilter.statusUse?.includes(ticket.statusUse))
            // }
        }
        tickets.reverse();

        return tickets;
    }
)
export const updateDate = createAsyncThunk(
    'tickets/update',
    async ({ id, dateUsed }: { id: string, dateUsed: Timestamp }) => {
        const ref = doc(db, 'tickets', id);
        await updateDoc(ref, { dateUsed })
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
        builder.addCase(updateDate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateDate.fulfilled, (state, action) => {
            state.message.fail = false;
            state.message.text = "Cập nhật thành công";
            state.loading = false;
        });
        builder.addCase(updateDate.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
})

const ticketReducer = ticketSlice.reducer;

export const ticketSelector = (state: RootState) => state.ticketReducer;

export default ticketReducer;