import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportTicketController } from '../apis/SupportTicketController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        SupportTicket
} from '../models/SupportTicket';


export namespace SupportTicketAsync {
    export const readAll = async () => {
        return SupportTicketController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as SupportTicket[]);
            })
            .catch((err) => {
                console.log(`SupportTicketController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (supportticketId: string) => {
        return SupportTicketController.read
            .fetch(
                {
                    url: { id: supportticketId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as SupportTicket);
            })
            .catch((err) => {
                console.log(`SupportTicketController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (supportticket: SupportTicket, reload: boolean = true) => {
        return SupportTicketController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...supportticket
                    } as SupportTicket
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as SupportTicket);
            })
            .catch((err) => {
                console.log(`SupportTicketController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (supportticket: SupportTicket, reload: boolean = true) => {
        return SupportTicketController.update
        .fetch(
            {
                url: { reload: reload },
                body: supportticket
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as SupportTicket);
        })
        .catch((err) => {
            console.log(`SupportTicketController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace SupportTicketRedux {
    export type State = {
        supporttickets: Array<SupportTicket>;
        activeSupportTicket?: SupportTicket;
        loadingSupportTicket: boolean;
    };

    export const initialState: State = {
        supporttickets: [],
        activeSupportTicket: undefined,
        loadingSupportTicket: false
    };

    export const loadSupportTickets = createAsyncThunk<SupportTicket[]>('SupportTicket/loadAll', async () => {
        return SupportTicketAsync.readAll();
    });

    export const readSupportTicket = createAsyncThunk<SupportTicket, string>('SupportTicket/read', async (supportticketId) => {
        return SupportTicketAsync.read(supportticketId);
    });

    export const insertSupportTicket = createAsyncThunk<SupportTicket, SupportTicket>('SupportTicket/insert', async (supportticket) => {
        return SupportTicketAsync.create(supportticket);
    });

    type UpdateArgs = { supportticket: SupportTicket, reload: boolean };
    export const updateSupportTicket = createAsyncThunk<SupportTicket, UpdateArgs>('SupportTicket/update', async (args) => {
        return SupportTicketAsync.update(args.supportticket, args.reload);
    });

    function updateArray(array: Array<SupportTicket>, element: SupportTicket, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'SupportTickets',
        initialState,
        reducers: {
            setActiveSupportTicket(state: State, action: PayloadAction<SupportTicket>) {
                updateArray(state.supporttickets, action.payload, false);
                state.activeSupportTicket = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadSupportTickets.pending, (state, action) => {
                state.loadingSupportTicket = true;
            });

            builder.addCase(loadSupportTickets.fulfilled, (state, action) => {
                state.loadingSupportTicket = false;
                state.supporttickets = action.payload;
            });

            builder.addCase(insertSupportTicket.fulfilled, (state, action) => {
                state.activeSupportTicket = action.payload;
                state.supporttickets = [...state.supporttickets, action.payload]
            });

            builder.addCase(readSupportTicket.pending, (state, action) => {
                state.loadingSupportTicket = true;
            });

            builder.addCase(readSupportTicket.fulfilled, (state, action) => {
                state.loadingSupportTicket = false;
                state.activeSupportTicket = action.payload;
                //state.supporttickets = [...state.supporttickets, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}