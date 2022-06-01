import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderController } from '../apis/OrderController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Order
} from '../models/Order';


export namespace OrderAsync {
    export const readAll = async () => {
        return OrderController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Order[]);
            })
            .catch((err) => {
                console.log(`OrderController.readAll error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (orderId: string) => {
        return OrderController.read
            .fetch(
                {
                    url: { id: orderId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Order);
            })
            .catch((err) => {
                console.log(`OrderController.read error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (order: Order, reload: boolean = true) => {
        return OrderController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...order
                    } as Order
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Order);
            })
            .catch((err) => {
                console.log(`OrderController.create error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (order: Order, reload: boolean = true) => {
        return OrderController.update
        .fetch(
            {
                url: { reload: reload },
                body: order
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Order);
        })
        .catch((err) => {
            console.log(`OrderController.update error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace OrderRedux {
    export type State = {
        orders: Array<Order>;
        activeOrder?: Order;
        loadingOrder: boolean;
    };

    export const initialState: State = {
        orders: [],
        activeOrder: undefined,
        loadingOrder: false
    };

    export const loadOrders = createAsyncThunk<Order[]>('Order/loadAll', async () => {
        return OrderAsync.readAll();
    });

    export const readOrder = createAsyncThunk<Order, string>('Order/read', async (orderId) => {
        return OrderAsync.read(orderId);
    });

    export const insertOrder = createAsyncThunk<Order, Order>('Order/insert', async (order) => {
        return OrderAsync.create(order);
    });

    type UpdateArgs = { order: Order, reload: boolean };
    export const updateOrder = createAsyncThunk<Order, UpdateArgs>('Order/update', async (args) => {
        return OrderAsync.update(args.order, args.reload);
    });

    function updateArray(array: Array<Order>, element: Order, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Orders',
        initialState,
        reducers: {
            setActiveOrder(state: State, action: PayloadAction<Order>) {
                updateArray(state.orders, action.payload, false);
                state.activeOrder = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadOrders.pending, (state, action) => {
                state.loadingOrder = true;
            });

            builder.addCase(loadOrders.fulfilled, (state, action) => {
                state.loadingOrder = false;
                state.orders = action.payload;
            });

            builder.addCase(insertOrder.fulfilled, (state, action) => {
                state.activeOrder = action.payload;
                state.orders = [...state.orders, action.payload]
            });

            builder.addCase(readOrder.pending, (state, action) => {
                state.loadingOrder = true;
            });

            builder.addCase(readOrder.fulfilled, (state, action) => {
                state.loadingOrder = false;
                state.activeOrder = action.payload;
                //state.orders = [...state.orders, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}