import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { iFilter } from "../../interface/filter";
import { defaultPackageState } from "../../interface/intialState";
import { packageType, TicketType } from "../../interface/ticket";
import { RootState } from "../../store";

const initialState: defaultPackageState = {
    loading: false,
    pack: null,
    packages: [],
    packageFilter: [],
    message: {
        text: '',
        fail: false
    }
}

export const getAll = createAsyncThunk('packages/getAll',
    async (filter?: iFilter) => {
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

export const get = createAsyncThunk(
    'packages/get',
    async (id: string) => {
        let pack: packageType;
        const packRef = doc(db, 'packages', id);
        const packSnap = await getDoc(packRef);
        pack = {
            id,
            ...(packSnap.data() as packageType)
        }
        return pack;
    })

export const addPackage = createAsyncThunk(
    'packages/add',
    async (values: packageType) => {
        const newData = doc(collection(db, 'packages'));
        await setDoc(newData, values);
        const ref = doc(db, 'packages', newData.id);
        const snap = await getDoc(ref);
        return snap
    }
)
export const update = createAsyncThunk(
    "packages/update",
    async ({ id, ...value }: packageType) => {
        const ref = doc(db, "packages", id as string);
        await updateDoc(ref, { ...value });
    }
);

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
        builder.addCase(get.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.pack = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(get.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
        builder.addCase(addPackage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addPackage.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addPackage.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
        builder.addCase(update.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.message.fail = false;
            state.message.text = "Cập nhật thành công";
            state.loading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
})

const packageReducer = packageSlice.reducer;

export const packageSelector = (state: RootState) => state.packageReducer;

export default packageReducer
