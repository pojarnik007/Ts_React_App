import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRecipesResponse, IRecipe, IRecipesQueryArgs } from './types'; 

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    
    getRecipes: builder.query<IRecipesResponse, IRecipesQueryArgs>({
      query: ({ searchTerm, limit, skip, cuisine, mealType }) => {
        if (searchTerm) {
          return `recipes/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
        }
        if (cuisine && cuisine !== 'All') {
            return `recipes/tag/${cuisine}?limit=${limit}&skip=${skip}`;
        }
        if (mealType && mealType !== 'All') {
            return `recipes/tag/${mealType}?limit=${limit}&skip=${skip}`;
        }
        return `recipes?limit=${limit}&skip=${skip}`;
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
  useGetRecipeByIdQuery,
  useGetAllRecipesForCategoriesQuery 
} = recipesApi;