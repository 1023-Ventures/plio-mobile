import { AssetRedux, ImageRedux, MessageRedux, ServiceRequestRedux, TopicRedux } from '@1023-ventures/plio-api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { AddAssetRedux } from './AddAssetRedux';
import { HomeTabRedux } from './HomeTabRedux';
import { NewsFeedReducer } from './NewsFeeds';

const rootReducer = combineReducers({
    assets: AssetRedux.Reducer,
    images: ImageRedux.Reducer,
    homeTab: HomeTabRedux.Reducer,
    addAsset: AddAssetRedux.Reducer,
    serviceRequests: ServiceRequestRedux.Reducer,
    messages: MessageRedux.Reducer,
    topics: TopicRedux.Reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector = createSelectorHook<RootState>();
export const useTypedDispatch = useDispatch;

const store = configureStore({ reducer: rootReducer });

export default store;
