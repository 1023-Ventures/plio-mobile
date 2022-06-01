import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageController } from '../apis/MessageController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Message
} from '../models/Message';


export namespace MessageAsync {
    export const readAll = async () => {
        return MessageController.readAll
            .fetch({}, { baseURL: process.env.API_URL_BURDI })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Message[]);
            })
            .catch((err) => {
                console.log(`MessageController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (messageId: string) => {
        return MessageController.read
            .fetch(
                {
                    url: { id: messageId }
                },
                { baseURL: process.env.API_URL_BURDI }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Message);
            })
            .catch((err) => {
                console.log(`MessageController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (message: Message, reload: boolean = true) => {
        return MessageController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...message
                    } as Message
                },
                { baseURL: process.env.API_URL_BURDI }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Message);
            })
            .catch((err) => {
                console.log(`MessageController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (message: Message, reload: boolean = true) => {
        return MessageController.update
        .fetch(
            {
                url: { reload: reload },
                body: message
            },
            { baseURL: process.env.API_URL_BURDI }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Message);
        })
        .catch((err) => {
            console.log(`MessageController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace MessageRedux {
    export type State = {
        messages: Array<Message>;
        activeMessage?: Message;
        loadingMessage: boolean;
    };

    export const initialState: State = {
        messages: [],
        activeMessage: undefined,
        loadingMessage: false
    };

    export const loadMessages = createAsyncThunk<Message[]>('Message/loadAll', async () => {
        return MessageAsync.readAll();
    });

    export const readMessage = createAsyncThunk<Message, string>('Message/read', async (messageId) => {
        return MessageAsync.read(messageId);
    });

    export const insertMessage = createAsyncThunk<Message, Message>('Message/insert', async (message) => {
        return MessageAsync.create(message);
    });

    type UpdateArgs = { message: Message, reload: boolean };
    export const updateMessage = createAsyncThunk<Message, UpdateArgs>('Message/update', async (args) => {
        return MessageAsync.update(args.message, args.reload);
    });

    function updateArray(array: Array<Message>, element: Message, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Messages',
        initialState,
        reducers: {
            setActiveMessage(state: State, action: PayloadAction<Message>) {
                updateArray(state.messages, action.payload, false);
                state.activeMessage = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadMessages.pending, (state, action) => {
                state.loadingMessage = true;
            });

            builder.addCase(loadMessages.fulfilled, (state, action) => {
                state.loadingMessage = false;
                state.messages = action.payload;
            });

            builder.addCase(insertMessage.fulfilled, (state, action) => {
                state.activeMessage = action.payload;
                state.messages = [...state.messages, action.payload]
            });

            builder.addCase(readMessage.pending, (state, action) => {
                state.loadingMessage = true;
            });

            builder.addCase(readMessage.fulfilled, (state, action) => {
                state.loadingMessage = false;
                state.activeMessage = action.payload;
                //state.messages = [...state.messages, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}