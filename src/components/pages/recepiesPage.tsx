import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Chip, 
  CircularProgress, 
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import { useGetAllRecipesQuery } from '../services/recepies';

const HomePage = () => {
  const { data, isLoading } = useGetAllRecipesQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="lg">
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Рецепты
        </Typography>

        <Grid container spacing={4}>
          {data?.recipes.map((recipe) => (
            <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>

              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.name}
                  </Typography>
                  
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={recipe.difficulty} color={recipe.difficulty === 'Easy' ? 'success' : 'warning'} size="small" />
                    <Chip label={recipe.cuisine} variant="outlined" size="small" />
                  </Box>
                  
                  <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                    Время готовки: {recipe.cookTimeMinutes} мин.
                    <br />
                    Калории: {recipe.caloriesPerServing}
                  </Typography>
                </CardContent>
                
                <CardActions>

                  <Button size="small" component={RouterLink} to={`/recipe/${recipe.id}`}>
                    Подробнее
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;