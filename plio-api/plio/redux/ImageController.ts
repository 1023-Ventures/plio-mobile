import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageController } from '../apis/ImageController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Image
} from '../models/Image';


export namespace ImageAsync {
    export const readAll = async () => {
        return ImageController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Image[]);
            })
            .catch((err) => {
                console.log(`ImageController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (imageId: string) => {
        return ImageController.read
            .fetch(
                {
                    url: { id: imageId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Image);
            })
            .catch((err) => {
                console.log(`ImageController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (image: Image, reload: boolean = true) => {
        return ImageController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...image
                    } as Image
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Image);
            })
            .catch((err) => {
                console.log(`ImageController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (image: Image, reload: boolean = true) => {
        return ImageController.update
        .fetch(
            {
                url: { reload: reload },
                body: image
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Image);
        })
        .catch((err) => {
            console.log(`ImageController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace ImageRedux {
    export type State = {
        images: Array<Image>;
        activeImage?: Image;
        loadingImage: boolean;
    };

    export const initialState: State = {
        images: [],
        activeImage: undefined,
        loadingImage: false
    };

    export const loadImages = createAsyncThunk<Image[]>('Image/loadAll', async () => {
        return ImageAsync.readAll();
    });

    export const readImage = createAsyncThunk<Image, string>('Image/read', async (imageId) => {
        return ImageAsync.read(imageId);
    });

    export const insertImage = createAsyncThunk<Image, Image>('Image/insert', async (image) => {
        return ImageAsync.create(image);
    });

    type UpdateArgs = { image: Image, reload: boolean };
    export const updateImage = createAsyncThunk<Image, UpdateArgs>('Image/update', async (args) => {
        return ImageAsync.update(args.image, args.reload);
    });

    function updateArray(array: Array<Image>, element: Image, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Images',
        initialState,
        reducers: {
            setActiveImage(state: State, action: PayloadAction<Image>) {
                updateArray(state.images, action.payload, false);
                state.activeImage = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadImages.pending, (state, action) => {
                state.loadingImage = true;
            });

            builder.addCase(loadImages.fulfilled, (state, action) => {
                state.loadingImage = false;
                state.images = action.payload;
            });

            builder.addCase(insertImage.fulfilled, (state, action) => {
                state.activeImage = action.payload;
                state.images = [...state.images, action.payload]
            });

            builder.addCase(readImage.pending, (state, action) => {
                state.loadingImage = true;
            });

            builder.addCase(readImage.fulfilled, (state, action) => {
                state.loadingImage = false;
                state.activeImage = action.payload;
                //state.images = [...state.images, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}