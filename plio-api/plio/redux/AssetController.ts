import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetController } from '../apis/AssetController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Asset
} from '../models/Asset';


export namespace AssetAsync {
    export const readAll = async () => {
        return AssetController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Asset[]);
            })
            .catch((err) => {
                console.log(`AssetController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (assetId: string) => {
        return AssetController.read
            .fetch(
                {
                    url: { id: assetId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Asset);
            })
            .catch((err) => {
                console.log(`AssetController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (asset: Asset, reload: boolean = true) => {
        return AssetController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...asset
                    } as Asset
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Asset);
            })
            .catch((err) => {
                console.log(`AssetController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (asset: Asset, reload: boolean = true) => {
        return AssetController.update
        .fetch(
            {
                url: { reload: reload },
                body: asset
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Asset);
        })
        .catch((err) => {
            console.log(`AssetController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace AssetRedux {
    export type State = {
        assets: Array<Asset>;
        activeAsset?: Asset;
        loadingAsset: boolean;
    };

    export const initialState: State = {
        assets: [],
        activeAsset: undefined,
        loadingAsset: false
    };

    export const loadAssets = createAsyncThunk<Asset[]>('Asset/loadAll', async () => {
        return AssetAsync.readAll();
    });

    export const readAsset = createAsyncThunk<Asset, string>('Asset/read', async (assetId) => {
        return AssetAsync.read(assetId);
    });

    export const insertAsset = createAsyncThunk<Asset, Asset>('Asset/insert', async (asset) => {
        return AssetAsync.create(asset);
    });

    type UpdateArgs = { asset: Asset, reload: boolean };
    export const updateAsset = createAsyncThunk<Asset, UpdateArgs>('Asset/update', async (args) => {
        return AssetAsync.update(args.asset, args.reload);
    });

    function updateArray(array: Array<Asset>, element: Asset, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Assets',
        initialState,
        reducers: {
            setActiveAsset(state: State, action: PayloadAction<Asset>) {
                updateArray(state.assets, action.payload, false);
                state.activeAsset = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadAssets.pending, (state, action) => {
                state.loadingAsset = true;
            });

            builder.addCase(loadAssets.fulfilled, (state, action) => {
                state.loadingAsset = false;
                state.assets = action.payload;
            });

            builder.addCase(insertAsset.fulfilled, (state, action) => {
                state.activeAsset = action.payload;
                state.assets = [...state.assets, action.payload]
            });

            builder.addCase(readAsset.pending, (state, action) => {
                state.loadingAsset = true;
            });

            builder.addCase(readAsset.fulfilled, (state, action) => {
                state.loadingAsset = false;
                state.activeAsset = action.payload;
                //state.assets = [...state.assets, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}