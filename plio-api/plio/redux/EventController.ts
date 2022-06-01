import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventController } from '../apis/EventController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Event
} from '../models/Event';


export namespace EventAsync {
    export const readAll = async () => {
        return EventController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Event[]);
            })
            .catch((err) => {
                console.log(`EventController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (eventId: string) => {
        return EventController.read
            .fetch(
                {
                    url: { id: eventId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Event);
            })
            .catch((err) => {
                console.log(`EventController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (event: Event, reload: boolean = true) => {
        return EventController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...event
                    } as Event
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Event);
            })
            .catch((err) => {
                console.log(`EventController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (event: Event, reload: boolean = true) => {
        return EventController.update
        .fetch(
            {
                url: { reload: reload },
                body: event
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Event);
        })
        .catch((err) => {
            console.log(`EventController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace EventRedux {
    export type State = {
        events: Array<Event>;
        activeEvent?: Event;
        loadingEvent: boolean;
    };

    export const initialState: State = {
        events: [],
        activeEvent: undefined,
        loadingEvent: false
    };

    export const loadEvents = createAsyncThunk<Event[]>('Event/loadAll', async () => {
        return EventAsync.readAll();
    });

    export const readEvent = createAsyncThunk<Event, string>('Event/read', async (eventId) => {
        return EventAsync.read(eventId);
    });

    export const insertEvent = createAsyncThunk<Event, Event>('Event/insert', async (event) => {
        return EventAsync.create(event);
    });

    type UpdateArgs = { event: Event, reload: boolean };
    export const updateEvent = createAsyncThunk<Event, UpdateArgs>('Event/update', async (args) => {
        return EventAsync.update(args.event, args.reload);
    });

    function updateArray(array: Array<Event>, element: Event, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Events',
        initialState,
        reducers: {
            setActiveEvent(state: State, action: PayloadAction<Event>) {
                updateArray(state.events, action.payload, false);
                state.activeEvent = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadEvents.pending, (state, action) => {
                state.loadingEvent = true;
            });

            builder.addCase(loadEvents.fulfilled, (state, action) => {
                state.loadingEvent = false;
                state.events = action.payload;
            });

            builder.addCase(insertEvent.fulfilled, (state, action) => {
                state.activeEvent = action.payload;
                state.events = [...state.events, action.payload]
            });

            builder.addCase(readEvent.pending, (state, action) => {
                state.loadingEvent = true;
            });

            builder.addCase(readEvent.fulfilled, (state, action) => {
                state.loadingEvent = false;
                state.activeEvent = action.payload;
                //state.events = [...state.events, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}