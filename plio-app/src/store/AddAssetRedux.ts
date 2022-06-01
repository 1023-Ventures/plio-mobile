import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export namespace AddAssetRedux {
    export type State = {
        dialogVisible: boolean;
    };

    export const initialState: State = {
        dialogVisible: false
    };

    const slice = createSlice({
        name: 'AddAssetRedux',
        initialState,
        reducers: {
            setDialogVisibile(state: State, action: PayloadAction<boolean>) {
                state.dialogVisible = action.payload;
            }
        },
        extraReducers: (builder) => {}
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
}
