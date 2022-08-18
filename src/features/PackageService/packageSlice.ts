import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Filter } from "../../interface/filter";
import { defaultPackageState } from "../../interface/intialState";
import { packageType } from "../../interface/ticket";
import { RootState } from "../../store";

const initialState: defaultPackageState = {
    loading: false,
    package: null,
    packages: [],
    packageFilter: [],
    message: {
        text: '',
        fail: false
    }
}

export const getAll = createAsyncThunk('packages/getAll',
    async (filter?: Filter) => {
        let packages: packageType[] = [];

        const queryTicket = await getDocs(collection(db, 'packages'));
        queryTicket.forEach((value) => {
            packages.push({
                id: value.id,
                ...(value.data() as packageType)
            })
        })
        if (filter) {
            if (filter.keywords != '') {
                packages = packages.filter(
                    (packag) =>
                        packag.packageName?.toLowerCase().includes(filter.keywords?.toLowerCase()) ||
                        packag.packageId?.toLowerCase().includes(filter.keywords?.toLowerCase())
                )
            }
        }
        packages.reverse();
        return packages;
    }
)
const packageSlice = createSlice({
    name: 'packages',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.packages = action.payload;
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

const packageReducer = packageSlice.reducer;

export const packageSelector = (state: RootState) => state.packageReducer;

export default packageReducer
