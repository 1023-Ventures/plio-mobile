import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopicController } from '../apis/TopicController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Topic
} from '../models/Topic';


export namespace TopicAsync {
    export const readAll = async () => {
        return TopicController.readAll
            .fetch({}, { baseURL: process.env.API_URL_BURDI })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Topic[]);
            })
            .catch((err) => {
                console.log(`TopicController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (topicId: string) => {
        return TopicController.read
            .fetch(
                {
                    url: { id: topicId }
                },
                { baseURL: process.env.API_URL_BURDI }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Topic);
            })
            .catch((err) => {
                console.log(`TopicController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (topic: Topic, reload: boolean = true) => {
        return TopicController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...topic
                    } as Topic
                },
                { baseURL: process.env.API_URL_BURDI }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Topic);
            })
            .catch((err) => {
                console.log(`TopicController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (topic: Topic, reload: boolean = true) => {
        return TopicController.update
        .fetch(
            {
                url: { reload: reload },
                body: topic
            },
            { baseURL: process.env.API_URL_BURDI }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Topic);
        })
        .catch((err) => {
            console.log(`TopicController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace TopicRedux {
    export type State = {
        topics: Array<Topic>;
        activeTopic?: Topic;
        loadingTopic: boolean;
    };

    export const initialState: State = {
        topics: [],
        activeTopic: undefined,
        loadingTopic: false
    };

    export const loadTopics = createAsyncThunk<Topic[]>('Topic/loadAll', async () => {
        return TopicAsync.readAll();
    });

    export const readTopic = createAsyncThunk<Topic, string>('Topic/read', async (topicId) => {
        return TopicAsync.read(topicId);
    });

    export const insertTopic = createAsyncThunk<Topic, Topic>('Topic/insert', async (topic) => {
        return TopicAsync.create(topic);
    });

    type UpdateArgs = { topic: Topic, reload: boolean };
    export const updateTopic = createAsyncThunk<Topic, UpdateArgs>('Topic/update', async (args) => {
        return TopicAsync.update(args.topic, args.reload);
    });

    function updateArray(array: Array<Topic>, element: Topic, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Topics',
        initialState,
        reducers: {
            setActiveTopic(state: State, action: PayloadAction<Topic>) {
                updateArray(state.topics, action.payload, false);
                state.activeTopic = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadTopics.pending, (state, action) => {
                state.loadingTopic = true;
            });

            builder.addCase(loadTopics.fulfilled, (state, action) => {
                state.loadingTopic = false;
                state.topics = action.payload;
            });

            builder.addCase(insertTopic.fulfilled, (state, action) => {
                state.activeTopic = action.payload;
                state.topics = [...state.topics, action.payload]
            });

            builder.addCase(readTopic.pending, (state, action) => {
                state.loadingTopic = true;
            });

            builder.addCase(readTopic.fulfilled, (state, action) => {
                state.loadingTopic = false;
                state.activeTopic = action.payload;
                //state.topics = [...state.topics, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}