import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsFeedController } from '../apis/NewsFeedController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        NewsFeed
} from '../models/NewsFeed';


export namespace NewsFeedAsync {
    export const readAll = async () => {
        return NewsFeedController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as NewsFeed[]);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (newsfeedId: string) => {
        return NewsFeedController.read
            .fetch(
                {
                    url: { id: newsfeedId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as NewsFeed);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (newsfeed: NewsFeed, reload: boolean = true) => {
        return NewsFeedController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...newsfeed
                    } as NewsFeed
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as NewsFeed);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (newsfeed: NewsFeed, reload: boolean = true) => {
        return NewsFeedController.update
        .fetch(
            {
                url: { reload: reload },
                body: newsfeed
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as NewsFeed);
        })
        .catch((err) => {
            console.log(`error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace NewsFeedRedux {
    export type State = {
        newsfeeds: Array<NewsFeed>;
        activeNewsFeed?: NewsFeed;
        loadingNewsFeed: boolean;
    };

    export const initialState: State = {
        newsfeeds: [],
        activeNewsFeed: undefined,
        loadingNewsFeed: false
    };

    export const loadNewsFeeds = createAsyncThunk<NewsFeed[]>('NewsFeed/loadAll', async () => {
        return NewsFeedAsync.readAll();
    });

    export const readNewsFeed = createAsyncThunk<NewsFeed, string>('NewsFeed/read', async (newsfeedId) => {
        return NewsFeedAsync.read(newsfeedId);
    });

    export const insertNewsFeed = createAsyncThunk<NewsFeed, NewsFeed>('NewsFeed/insert', async (newsfeed) => {
        return NewsFeedAsync.create(newsfeed);
    });

    type UpdateArgs = { newsfeed: NewsFeed, reload: boolean };
    export const updateNewsFeed = createAsyncThunk<NewsFeed, UpdateArgs>('NewsFeed/update', async (args) => {
        return NewsFeedAsync.update(args.newsfeed, args.reload);
    });

    function updateArray(array: Array<NewsFeed>, element: NewsFeed, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'NewsFeeds',
        initialState,
        reducers: {
            setActiveNewsFeed(state: State, action: PayloadAction<NewsFeed>) {
                updateArray(state.newsfeeds, action.payload, false);
                state.activeNewsFeed = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadNewsFeeds.pending, (state, action) => {
                state.loadingNewsFeed = true;
            });

            builder.addCase(loadNewsFeeds.fulfilled, (state, action) => {
                state.loadingNewsFeed = false;
                state.newsfeeds = action.payload;
            });

            builder.addCase(insertNewsFeed.fulfilled, (state, action) => {
                state.activeNewsFeed = action.payload;
                state.newsfeeds = [...state.newsfeeds, action.payload]
            });

            builder.addCase(readNewsFeed.pending, (state, action) => {
                state.loadingNewsFeed = true;
            });

            builder.addCase(readNewsFeed.fulfilled, (state, action) => {
                state.loadingNewsFeed = false;
                state.activeNewsFeed = action.payload;
                //state.newsfeeds = [...state.newsfeeds, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}