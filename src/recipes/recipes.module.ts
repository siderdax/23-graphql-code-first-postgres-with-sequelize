import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './models/recipe.model';
import { Ingredients } from './models/ingredients.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Ingredients])],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
