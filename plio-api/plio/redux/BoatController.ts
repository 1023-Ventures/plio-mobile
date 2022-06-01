import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoatController } from '../apis/BoatController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Boat
} from '../models/Boat';


export namespace BoatAsync {
    export const readAll = async () => {
        return BoatController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Boat[]);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (boatId: string) => {
        return BoatController.read
            .fetch(
                {
                    url: { id: boatId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Boat);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (boat: Boat, reload: boolean = true) => {
        return BoatController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...boat
                    } as Boat
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Boat);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (boat: Boat, reload: boolean = true) => {
        return BoatController.update
        .fetch(
            {
                url: { reload: reload },
                body: boat
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Boat);
        })
        .catch((err) => {
            console.log(`error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace BoatRedux {
    export type State = {
        boats: Array<Boat>;
        activeBoat?: Boat;
        loadingBoat: boolean;
    };

    export const initialState: State = {
        boats: [],
        activeBoat: undefined,
        loadingBoat: false
    };

    export const loadBoats = createAsyncThunk<Boat[]>('Boat/loadAll', async () => {
        return BoatAsync.readAll();
    });

    export const readBoat = createAsyncThunk<Boat, string>('Boat/read', async (boatId) => {
        return BoatAsync.read(boatId);
    });

    export const insertBoat = createAsyncThunk<Boat, Boat>('Boat/insert', async (boat) => {
        return BoatAsync.create(boat);
    });

    type UpdateArgs = { boat: Boat, reload: boolean };
    export const updateBoat = createAsyncThunk<Boat, UpdateArgs>('Boat/update', async (args) => {
        return BoatAsync.update(args.boat, args.reload);
    });

    function updateArray(array: Array<Boat>, element: Boat, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Boats',
        initialState,
        reducers: {
            setActiveBoat(state: State, action: PayloadAction<Boat>) {
                updateArray(state.boats, action.payload, false);
                state.activeBoat = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadBoats.pending, (state, action) => {
                state.loadingBoat = true;
            });

            builder.addCase(loadBoats.fulfilled, (state, action) => {
                state.loadingBoat = false;
                state.boats = action.payload;
            });

            builder.addCase(insertBoat.fulfilled, (state, action) => {
                state.activeBoat = action.payload;
                state.boats = [...state.boats, action.payload]
            });

            builder.addCase(readBoat.pending, (state, action) => {
                state.loadingBoat = true;
            });

            builder.addCase(readBoat.fulfilled, (state, action) => {
                state.loadingBoat = false;
                state.activeBoat = action.payload;
                //state.boats = [...state.boats, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}