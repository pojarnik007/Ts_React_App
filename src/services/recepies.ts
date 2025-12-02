import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRecipesResponse, IRecipe, ISearchRecipesArgs, IGetRecipesArgs, IGetRecipesByTagArgs } from './types'; 

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({

    getRecipes: builder.query<IRecipesResponse, IGetRecipesArgs>({
      query: ({ limit, skip, sortBy, order }) => {

        let url = `recipes?limit=${limit}&skip=${skip}`;

        if (sortBy && order) {
          url += `&sortBy=${sortBy}&order=${order}`;
        }
        
        return url;
      },
    }),

    searchRecipes: builder.query<IRecipesResponse, ISearchRecipesArgs>({
      query: ({ searchTerm, limit, skip }) => {
        return `recipes/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
      },
    }),

    getRecipesByTag: builder.query<IRecipesResponse, IGetRecipesByTagArgs>({
      query: ({ tag, limit, skip }) => {
        return `recipes/tag/${tag}?limit=${limit}&skip=${skip}`;
      },
    }),

    getAllRecipesForCategories: builder.query<IRecipesResponse, void>({
        query: () => 'recipes?limit=0', 
        keepUnusedDataFor: 3600, 
    }),

    getRecipeById: builder.query<IRecipe, string | undefined>({
      query: (id) => `recipes/${id}`,
    }),

  }),
});

export const { 
  useGetRecipesQuery,
  useSearchRecipesQuery,
  useGetRecipesByTagQuery,
  useGetRecipeByIdQuery,
  useGetAllRecipesForCategoriesQuery 
} = recipesApi;