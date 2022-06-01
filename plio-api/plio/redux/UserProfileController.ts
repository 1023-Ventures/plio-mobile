import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileController } from '../apis/UserProfileController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        UserProfile
} from '../models/UserProfile';


export namespace UserProfileAsync {
    export const readAll = async () => {
        return UserProfileController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as UserProfile[]);
            })
            .catch((err) => {
                console.log(`UserProfileController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (userprofileId: string) => {
        return UserProfileController.read
            .fetch(
                {
                    url: { id: userprofileId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as UserProfile);
            })
            .catch((err) => {
                console.log(`UserProfileController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (userprofile: UserProfile, reload: boolean = true) => {
        return UserProfileController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...userprofile
                    } as UserProfile
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as UserProfile);
            })
            .catch((err) => {
                console.log(`UserProfileController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (userprofile: UserProfile, reload: boolean = true) => {
        return UserProfileController.update
        .fetch(
            {
                url: { reload: reload },
                body: userprofile
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as UserProfile);
        })
        .catch((err) => {
            console.log(`UserProfileController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace UserProfileRedux {
    export type State = {
        userprofiles: Array<UserProfile>;
        activeUserProfile?: UserProfile;
        loadingUserProfile: boolean;
    };

    export const initialState: State = {
        userprofiles: [],
        activeUserProfile: undefined,
        loadingUserProfile: false
    };

    export const loadUserProfiles = createAsyncThunk<UserProfile[]>('UserProfile/loadAll', async () => {
        return UserProfileAsync.readAll();
    });

    export const readUserProfile = createAsyncThunk<UserProfile, string>('UserProfile/read', async (userprofileId) => {
        return UserProfileAsync.read(userprofileId);
    });

    export const insertUserProfile = createAsyncThunk<UserProfile, UserProfile>('UserProfile/insert', async (userprofile) => {
        return UserProfileAsync.create(userprofile);
    });

    type UpdateArgs = { userprofile: UserProfile, reload: boolean };
    export const updateUserProfile = createAsyncThunk<UserProfile, UpdateArgs>('UserProfile/update', async (args) => {
        return UserProfileAsync.update(args.userprofile, args.reload);
    });

    function updateArray(array: Array<UserProfile>, element: UserProfile, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'UserProfiles',
        initialState,
        reducers: {
            setActiveUserProfile(state: State, action: PayloadAction<UserProfile>) {
                updateArray(state.userprofiles, action.payload, false);
                state.activeUserProfile = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadUserProfiles.pending, (state, action) => {
                state.loadingUserProfile = true;
            });

            builder.addCase(loadUserProfiles.fulfilled, (state, action) => {
                state.loadingUserProfile = false;
                state.userprofiles = action.payload;
            });

            builder.addCase(insertUserProfile.fulfilled, (state, action) => {
                state.activeUserProfile = action.payload;
                state.userprofiles = [...state.userprofiles, action.payload]
            });

            builder.addCase(readUserProfile.pending, (state, action) => {
                state.loadingUserProfile = true;
            });

            builder.addCase(readUserProfile.fulfilled, (state, action) => {
                state.loadingUserProfile = false;
                state.activeUserProfile = action.payload;
                //state.userprofiles = [...state.userprofiles, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}