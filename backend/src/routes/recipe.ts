import passport from "passport";
import express from "express";
import {
  getAllRecipes,
  getRecipe,
  getUserRecipes,
  createRecipe,
  searchRecipe,
} from "./../controllers";
import { validate } from "../middlewares";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipeSchema,
  searchRecipeSchema,
} from "../routes/schema-validations";

const router = express.Router();

router.get(
  "/find",
  passport.authenticate("jwt", { session: false }),
  validate(searchRecipeSchema),
  searchRecipe
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
 validate(createRecipeSchema),
  createRecipe
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  validate(getUserRecipeSchema),
  getUserRecipes
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validate(getRecipeSchema),
  getRecipe
);

export { router };