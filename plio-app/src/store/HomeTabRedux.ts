import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export namespace HomeTabRedux {
    export type State = {
        currentTab: string;
        title: string;
    };

    export const initialState: State = {
        currentTab: '',
        title: ''
    };

    const slice = createSlice({
        name: 'HomeTabRedux',
        initialState,
        reducers: {
            setCurrentTab(state: State, action: PayloadAction<string>) {
                state.currentTab = action.payload;
            },
            setCurrentTabTitle(state: State, action: PayloadAction<string>) {
                state.title = action.payload ?? '';
            }
        },
        extraReducers: (builder) => {}
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
}
