import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ticketReducer from '../features/TicketManagement/ticketSlice'
import packageReducer from "../features/PackageService/packageSlice";

const store = configureStore({
    reducer: {
        ticketReducer,
        packageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type Appdispacth = typeof store.dispatch;
export const useAppdispatch: () => Appdispacth = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;