// import { Article, NewsFeed, NewsFeedController } from '@1023-ventures/plio-api';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// type State = {
//     articles: Array<Article>;
//     activeArticle?: Article;
// };

// const initialState: State = {
//     articles: [],
//     activeArticle: { name: '(active)' }
// };

// // thunks
// export const getNewNewsFeed = createAsyncThunk<NewsFeed>('facts/getNew', async () => {
//     //   const factString = await fetchFunFact(num);
//     console.log('get news feed');
//     NewsFeedController.readAll
//         .fetch({}, { baseURL: process.env.API_URL })
//         .then((resp: any) => {
//             const data = resp.data;
//             // actions()?.setRoles(data);
//             // actions()?.setLoading(false);
//         })
//         .catch((err: any) => {
//             // actions()?.setLoading(false);
//             throw err;
//         });
//     return {} as NewsFeed;
// });

// // slice
// const NewsFeedSlice = createSlice({
//     name: 'facts',
//     initialState,
//     reducers: {
//         loadNewsFeeds: (state) => {
//             console.log('loading news feed');
//             state.activeNewsFeed = { name: 'matt' };
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getNewNewsFeed.pending, (state) => {
//             console.log('getNewNewsFeed is pending');
//             // state.status = "loading";
//             // state.error = null;
//         });
//         builder.addCase(getNewNewsFeed.fulfilled, (state) => {
//             state.activeNewsFeed = { name: 'loaded' };
//             // state.status = "loading";
//             // state.error = null;
//         });
//         //   builder.addCase(getNewFact.fulfilled, (state, action) => {
//         //     state.status = "loaded";
//         //     state.pendingFact = action.payload;
//         //   });
//         //   builder.addCase(getNewFact.rejected, (state, action) => {
//         //     state.status = "errored";
//         //     state.error = action.error as Error;
//         //   });
//     }
// });

// // export reducers and thunks

// export const NewsFeedActions = NewsFeedSlice.actions;

// export const NewsFeedReducer = NewsFeedSlice.reducer;
