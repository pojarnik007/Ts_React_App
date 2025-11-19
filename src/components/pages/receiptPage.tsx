import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Box, Typography, CircularProgress, Button, Grid, Chip, Paper, 
  List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useGetRecipeByIdQuery } from '../services/recepies';
import "./css/receiptpage.css"

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(id || '', { skip: !id });

  if (isLoading) {
    return <Box id = "loader"><CircularProgress /></Box>;
  }

  if (!recipe) {
    return <Typography id = "error_message" variant="h5" align="center" mt={10}>Рецепт не найден</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={Link} to="/receipts" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Назад к списку
      </Button>

      <Grid container spacing={4}>
        <Grid size={{xs: 12 ,md: 5}}>
          <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <img id='Receipt_Image' src={recipe.image} alt={recipe.name}/>
          </Paper>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
             <Chip label={`Сложность: ${recipe.difficulty}`} color="primary" />
             <Chip label={`Кухня: ${recipe.cuisine}`} variant="outlined" />
             <Chip label={`⭐ Рейтинг: ${recipe.rating}`} color="warning" />
             <Chip label={`Порций: ${recipe.servings}`} />
          </Box>
        </Grid>
        <Grid size={{xs: 12, md: 7}}>
          <Typography variant="h3" component="h1" gutterBottom>
            {recipe.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
             Общее время: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} мин 
             (Подготовка: {recipe.prepTimeMinutes}, Готовка: {recipe.cookTimeMinutes})
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ mr: 1 }} /> Ингредиенты
          </Typography>
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <List dense>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} divider={index !== recipe.ingredients.length - 1}>
                  <ListItemIcon>
                    <Checkbox edge="start" />
                  </ListItemIcon>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Typography variant="h5" gutterBottom>
            Инструкция
          </Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            {recipe.instructions.map((step, index) => (
              <li id='Receipt_step' key={index}>
                <Typography variant="body1">{step}</Typography>
              </li>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipePage;