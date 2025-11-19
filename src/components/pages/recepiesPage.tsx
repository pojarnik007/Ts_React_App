import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, 
  Chip, CircularProgress, Box, TextField, FormControl, InputLabel, Select, MenuItem, 
  InputAdornment, Paper 
} from '@mui/material';
import { useGetAllRecipesQuery } from '../services/recepies';


const RecepiesPage = () => {
  const { data, isLoading } = useGetAllRecipesQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [cuisine, setCuisine] = useState('All');

  const allCuisines = useMemo(() => {
    if (!data || !data.recipes) return [];
    const cuisines = new Set(data.recipes.map((r: any) => r.cuisine as string));
    return Array.from(cuisines).sort();
  }, [data]);

  const filteredRecipes = useMemo(() => {
    if (!data || !data.recipes) return [];

    return data.recipes.filter((recipe: any) => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficulty === 'All' || recipe.difficulty === difficulty;
      const matchesCuisine = cuisine === 'All' || recipe.cuisine === cuisine;

      return matchesSearch && matchesDifficulty && matchesCuisine;
    });
  }, [data, searchQuery, difficulty, cuisine]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Рецепты
      </Typography>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#fafafaff' }} elevation={1}>
        <Grid container spacing={2} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Поиск рецепта"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Сложность</InputLabel>
              <Select
                value={difficulty}
                label="Сложность"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <MenuItem value="All">Любая</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Кухня</InputLabel>
              <Select
                value={cuisine}
                label="Кухня"
                onChange={(e) => setCuisine(e.target.value)}
              >
                <MenuItem value="All">Все кухни</MenuItem>
                {allCuisines.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe: any) => (
            <Grid key={recipe.id} size={{ xs:12, sm: 6, md: 4 }}> 
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
    </Container>
  );
};

export default RecepiesPage;