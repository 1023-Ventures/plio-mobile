import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleController } from '../apis/ArticleController';  /* If getting an error here, you will likely need to add this controller to your blacklistedReducers list in your paleo gen config */
import {
        Article
} from '../models/Article';


export namespace ArticleAsync {
    export const readAll = async () => {
        return ArticleController.readAll
            .fetch({}, { baseURL: process.env.API_URL })
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Article[]);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            }); 
    }

    export const read = async (articleId: string) => {
        return ArticleController.read
            .fetch(
                {
                    url: { id: articleId }
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Article);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });
    }

    export const create = async (article: Article, reload: boolean = true) => {
        return ArticleController.create
            .fetch(
                {
                    url: { reload: reload },
                    body: {
                        ...article
                    } as Article
                },
                { baseURL: process.env.API_URL }
            )
            .then((resp) => {
                const data = resp.data;
                return Promise.resolve(data as Article);
            })
            .catch((err) => {
                console.log(`error: ${err}`);
                return Promise.reject(err);
            });        
    }
    
    export const update = async (article: Article, reload: boolean = true) => {
        return ArticleController.update
        .fetch(
            {
                url: { reload: reload },
                body: article
            },
            { baseURL: process.env.API_URL }
        )
        .then((resp) => {
            const data = resp.data;
            return Promise.resolve(data as Article);
        })
        .catch((err) => {
            console.log(`error: ${err}`);
            return Promise.reject(err);
        });    
    }
}

export namespace ArticleRedux {
    export type State = {
        articles: Array<Article>;
        activeArticle?: Article;
        loadingArticle: boolean;
    };

    export const initialState: State = {
        articles: [],
        activeArticle: undefined,
        loadingArticle: false
    };

    export const loadArticles = createAsyncThunk<Article[]>('Article/loadAll', async () => {
        return ArticleAsync.readAll();
    });

    export const readArticle = createAsyncThunk<Article, string>('Article/read', async (articleId) => {
        return ArticleAsync.read(articleId);
    });

    export const insertArticle = createAsyncThunk<Article, Article>('Article/insert', async (article) => {
        return ArticleAsync.create(article);
    });

    type UpdateArgs = { article: Article, reload: boolean };
    export const updateArticle = createAsyncThunk<Article, UpdateArgs>('Article/update', async (args) => {
        return ArticleAsync.update(args.article, args.reload);
    });

    function updateArray(array: Array<Article>, element: Article, insertIfMissing: boolean) {
        if (element.id) {
            const idx = array.findIndex((b) => b.id == element.id);
            if (idx > -1) array[idx] = element;
        }
    }

    const slice = createSlice({
        name: 'Articles',
        initialState,
        reducers: {
            setActiveArticle(state: State, action: PayloadAction<Article>) {
                updateArray(state.articles, action.payload, false);
                state.activeArticle = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loadArticles.pending, (state, action) => {
                state.loadingArticle = true;
            });

            builder.addCase(loadArticles.fulfilled, (state, action) => {
                state.loadingArticle = false;
                state.articles = action.payload;
            });

            builder.addCase(insertArticle.fulfilled, (state, action) => {
                state.activeArticle = action.payload;
                state.articles = [...state.articles, action.payload]
            });

            builder.addCase(readArticle.pending, (state, action) => {
                state.loadingArticle = true;
            });

            builder.addCase(readArticle.fulfilled, (state, action) => {
                state.loadingArticle = false;
                state.activeArticle = action.payload;
                //state.articles = [...state.articles, action.payload]
            });
        }
    });

    export const Actions = slice.actions;

    export const Reducer = slice.reducer;
       
}