// get all recipes 	=> getRecieps 	  /api/recipes
// get  => getRecipeByID  	          /api/recipes/:id    params
// post => createRecipe, 	            /api/recipes        body
// patch => updateRecipeByID,         /api/recipes/:id    body
// delete => deleteRecipeByID,        /api/recipes/:id    params

import express from "express";
import cors from "cors";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://recipefe-be-server.onrender.com",
      "https://recipefe-be-server.onrender.com/api/recipes",
      "https://you-got-served-recipe-app.netlify.app/",
    ],
  })
);

// get all recipes
app.get("/api/recipes", async (req, res) => {
  const allRecipes = await getRecipes();

  res.send({ success: true, payload: allRecipes });
});

// get recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const getRecipe = await getRecipeByID(recipeId);
  res.send({ success: true, payload: getRecipe });

  // res.send(getRecipe);
  // res.json(getRecipe);
  // console.log(getRecipe);
});

// post

app.post("/api/recipes/", async (req, res) => {
  const newRecipe = req.body;
  const addNewRecipe = await createRecipe(newRecipe);
  res.json({ success: true, payload: addNewRecipe });
});

// Change recipe by finding right ID and updating recipe
// id, updatedRecipe
app.patch("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipeBody = req.body;
  // console.log(req.body);
  const updatedRecipe = await updateRecipeByID(recipeId, updatedRecipeBody);

  res.send({ success: true, payload: updatedRecipeBody });
});

app.delete("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const deletedRecipe = await deleteRecipeByID(recipeId);

  res.send({ success: true, payload: deletedRecipe });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
