import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceRequestController } from '../apis/ServiceRequestController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        ServiceRequest
} from '../models/ServiceRequest';


export namespace ServiceRequestAsync {
    export const readAll = async () => {
        return ServiceRequestController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as ServiceRequest[]);
            })
            .catch((err) => {
                console.log(`ServiceRequestController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (servicerequestId: string) => {
        return ServiceRequestController.read
            .fetch(
                {
                    url: { id: servicerequestId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as ServiceRequest);
            })
            .catch((err) => {
                console.log(`ServiceRequestController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (servicerequest: ServiceRequest, reload: boolean = true) => {
        return ServiceRequestController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...servicerequest
                    } as ServiceRequest
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as ServiceRequest);
            })
            .catch((err) => {
                console.log(`ServiceRequestController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (servicerequest: ServiceRequest, reload: boolean = true) => {
        return ServiceRequestController.update
        .fetch(
            {
                url: { reload: reload },
                body: servicerequest
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as ServiceRequest);
        })
        .catch((err) => {
            console.log(`ServiceRequestController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace ServiceRequestRedux {
    export type State = {
        servicerequests: Array<ServiceRequest>;
        activeServiceRequest?: ServiceRequest;
        loadingServiceRequest: boolean;
    };

    export const initialState: State = {
        servicerequests: [],
        activeServiceRequest: undefined,
        loadingServiceRequest: false
    };

    export const loadServiceRequests = createAsyncThunk<ServiceRequest[]>('ServiceRequest/loadAll', async () => {
        return ServiceRequestAsync.readAll();
    });

    export const readServiceRequest = createAsyncThunk<ServiceRequest, string>('ServiceRequest/read', async (servicerequestId) => {
        return ServiceRequestAsync.read(servicerequestId);
    });

    export const insertServiceRequest = createAsyncThunk<ServiceRequest, ServiceRequest>('ServiceRequest/insert', async (servicerequest) => {
        return ServiceRequestAsync.create(servicerequest);
    });

    type UpdateArgs = { servicerequest: ServiceRequest, reload: boolean };
    export const updateServiceRequest = createAsyncThunk<ServiceRequest, UpdateArgs>('ServiceRequest/update', async (args) => {
        return ServiceRequestAsync.update(args.servicerequest, args.reload);
    });

    function updateArray(array: Array<ServiceRequest>, element: ServiceRequest, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'ServiceRequests',
        initialState,
        reducers: {
            setActiveServiceRequest(state: State, action: PayloadAction<ServiceRequest>) {
                updateArray(state.servicerequests, action.payload, false);
                state.activeServiceRequest = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadServiceRequests.pending, (state, action) => {
                state.loadingServiceRequest = true;
            });

            builder.addCase(loadServiceRequests.fulfilled, (state, action) => {
                state.loadingServiceRequest = false;
                state.servicerequests = action.payload;
            });

            builder.addCase(insertServiceRequest.fulfilled, (state, action) => {
                state.activeServiceRequest = action.payload;
                state.servicerequests = [...state.servicerequests, action.payload]
            });

            builder.addCase(readServiceRequest.pending, (state, action) => {
                state.loadingServiceRequest = true;
            });

            builder.addCase(readServiceRequest.fulfilled, (state, action) => {
                state.loadingServiceRequest = false;
                state.activeServiceRequest = action.payload;
                //state.servicerequests = [...state.servicerequests, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}