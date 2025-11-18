import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRecipesResponse, IRecipe } from './types';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    
    getAllRecipes: builder.query<IRecipesResponse, void>({
      query: () => 'recipes?limit=0',
    }),

    searchRecipes: builder.query<IRecipesResponse, string>({
      query: (searchTerm) => `recipes/search?q=${searchTerm}`,
    }),

    getRecipeById: builder.query<IRecipe, string | undefined>({
      query: (id) => `recipes/${id}`,
    }),

  }),
});

export const { 
  useGetAllRecipesQuery, 
  useSearchRecipesQuery, 
  useGetRecipeByIdQuery 
} = recipesApi;