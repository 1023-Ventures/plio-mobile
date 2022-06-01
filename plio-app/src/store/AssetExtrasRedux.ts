// how do we handle this package name?
//import { FeedConnector, PiletApi } from '@1023-ventures/silur-app';
//import { ViewAsyncReducer } from '@1023-ventures/darri-core';
import { Asset, AssetController } from '@1023-ventures/plio-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export namespace AssetExtrasRedux {
    export type State = {
        localImageUri: string;
    };

    export const initialState: State = {
        localImageUri: ''
    };

    export const uploadImage = createAsyncThunk<void, string>('AssetEx/uploadImage', async (imageBase64: string) => {
        //console.log('here', imageUri);

        // const response = await fetch(imageUri)
        //     .then(async (resp) => {
        //         console.log('done');
        //         const b = await resp.blob();
        //         console.log(b.size);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        // return;

        // btoa(blob.arrayBuffer())
        // console.log(blob.size);
        // const a = btoa
        // // const bytes = await blob.arrayBuffer();
        // // bytes.

        // console.log('here');
        // // const formData = new FormData();
        // // formData.append('image', blob);

        // const formData = new FormData();
        // formData.append('fileName', 'test');
        // formData.append('formFile', blob);
        // console.log(process.env.API_URL + '/plio/api/Boat/uploadImage');
        // console.log(blob.type);

        // try {
        //     const res = await axios.post(process.env.API_URL + '/plio/api/Boat/uploadImage', formData, {
        //         headers: {
        //             'Content-Type': blob.type //'multipart/form-data'
        //         }
        //     });
        //     console.log(res);
        //     console.log('done');
        // } catch (anerr) {
        //     console.log(anerr);
        // }

        try {
            // const response = await fetch(imageUri);
            // console.log(response.json);

            // const blob = await response.blob();
            // console.log(blob);
            // console.log('-----');
            // const abuf = blob.arrayBuffer();
            // const inta = new Uint8Array(abuf);
            // const str = String.fromCharCode(...inta);
            // const img = Buffer.from(str).toString('base64');

            return AssetController.uploadImage
                .fetch(
                    {
                        body: {
                            image: imageBase64
                        }
                    },
                    {
                        baseURL: process.env.API_URL
                        // headers: {
                        //     'Content-Type': 'text/plain'
                        // }
                    }
                )
                .then((resp) => {
                    // const data = resp.data;
                    return Promise.resolve();
                })
                .catch((err) => {
                    // how do we communicate the error
                    console.log(`error: ${err}`);
                    return Promise.reject(err);
                });
        } catch (err) {
            console.log(err);
        }
    });

    const slice = createSlice({
        name: 'AssetEx',
        initialState,
        reducers: {},
        extraReducers: (builder) => {}
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
}
