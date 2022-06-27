import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { Ingredients } from './models/ingredients.model';
import { ID } from '@nestjs/graphql';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe) private recipeModel: typeof Recipe,
    @InjectModel(Ingredients) private ingredientModel: typeof Ingredients,
  ) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return await this.recipeModel
      .create({
        title: data.title,
        description: data.description,
        ingredients: data.ingredients.map(ingredient => ({
          ingredient,
        })),
      })
      .then(async recipe => {
        recipe.ingredients = await this.ingredientModel.bulkCreate(
          data.ingredients.map(ingredient => ({
            ingredient,
            recipeId: recipe.id,
          })),
        );

        return recipe;
      });
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return await this.recipeModel.findAll({ include: [Ingredients] });
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
