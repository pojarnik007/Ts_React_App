export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface IRecipesQueryArgs {
  searchTerm?: string;
  limit: number;
  skip: number;
  cuisine?: string;
  mealType?: string;
}

export interface IGetRecipesArgs {
  limit: number;
  skip: number;
  sortBy?: string;    
  order?: 'asc' | 'desc';
}

export interface ISearchRecipesArgs {
  searchTerm: string;
  limit: number;
  skip: number;
}

export interface IGetRecipesByTagArgs {
  tag: string; 
  limit: number;
  skip: number;
}