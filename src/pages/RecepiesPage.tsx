import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, 
  Chip, CircularProgress, Box, TextField, Paper, Pagination,
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetRecipesQuery, useGetAllRecipesForCategoriesQuery } from '../services/recepies'; 

const PAGE_SIZE = 9; 

const RecepiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All'); 
  const [mealTypeFilter, setMealTypeFilter] = useState('All'); 
  const [currentPage, setCurrentPage] = useState(1);

  const skip = (currentPage - 1) * PAGE_SIZE;

  const { data: categoriesData } = useGetAllRecipesForCategoriesQuery();

  const allCuisines = useMemo(() => {
    if (!categoriesData?.recipes) return [];
    const cuisines = new Set(categoriesData.recipes.map((r: any) => r.cuisine.trim() as string)); 
    return Array.from(cuisines).sort();
  }, [categoriesData]);

  const allMealTypes = useMemo(() => {
    if (!categoriesData?.recipes) return [];
    const mealTypes = new Set(categoriesData.recipes.map((r: any) => r.mealType as string));
    return Array.from(mealTypes).sort();
  }, [categoriesData]);

  const { data, isLoading, isFetching } = useGetRecipesQuery({
    searchTerm: searchQuery,
    limit: PAGE_SIZE,
    skip: skip,
    cuisine: cuisineFilter,
    mealType: mealTypeFilter,
  });

  const totalRecipes = data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / PAGE_SIZE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCuisineFilter('All'); 
    setMealTypeFilter('All');
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, otherSetter: React.Dispatch<React.SetStateAction<string>>) => (event: any) => {
    setter(event.target.value);
    setSearchQuery(''); 

    if (event.target.value !== 'All') {
        otherSetter('All');
    }
    
    setCurrentPage(1);
  };


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  const loadingIndicator = isFetching && (
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container sx={{ py: 4, mt: 10, mb: 10 }} maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Рецепты
      </Typography>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#fafafaff', position: 'relative' }} elevation={1}>
        <Grid container spacing={2} alignItems="center">
          
          <Grid size = {{xs:6, md:6}}>
            <TextField
              fullWidth
              label="Поиск рецепта"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Кухня</InputLabel>
              <Select
                value={cuisineFilter}
                label="Кухня"
                onChange={handleFilterChange(setCuisineFilter, setMealTypeFilter)}
              >
                <MenuItem value="All">Все кухни</MenuItem>
                {allCuisines.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Тип Блюда</InputLabel>
              <Select
                value={mealTypeFilter}
                label="Тип Блюда"
                onChange={handleFilterChange(setMealTypeFilter, setCuisineFilter)}
              >
                <MenuItem value="All">Любое</MenuItem>
                {allMealTypes.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </Paper>
      
      <Box sx={{ position: 'relative' }}>
        {loadingIndicator}

        <Grid container spacing={4}>
          {data?.recipes && data.recipes.length > 0 ? (
            data.recipes.map((recipe: any) => (
              <Grid key={recipe.id} size = {{xs:12, sm:6, md:4}}> 
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia component="img" height="200" image={recipe.image} alt={recipe.name} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={recipe.difficulty} color={recipe.difficulty === 'Easy' ? 'success' : 'warning'} size="small" />
                      <Chip label={recipe.cuisine} variant="outlined" size="small" />
                    </Box>
                    <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                      ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} мин. | 🔥 {recipe.caloriesPerServing} ккал
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/recipe/${recipe.id}`}>Подробнее</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mt: 4, width: '100%', textAlign: 'center' }}>
              Рецепты не найдены
            </Typography>
          )}
        </Grid>
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
          />
        </Box>
      )}

    </Container>
  );
};

export default RecepiesPage;