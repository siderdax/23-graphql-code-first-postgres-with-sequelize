import { ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table
@ObjectType()
export class Ingredients extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Recipe)
  @Column
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @AllowNull(false)
  @Column
  ingredient: string;
}
