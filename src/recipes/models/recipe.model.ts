import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, DataType, HasMany, CreatedAt } from 'sequelize-typescript';
import { Ingredients } from './ingredients.model';

@Table
@ObjectType({ description: 'recipe ' })
export class Recipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(type => ID)
  id: number;

  @AllowNull(false)
  @Column
  @Directive('@upper')
  title: string;

  @Column
  @Field({ nullable: true })
  description?: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  @Field()
  creationDate: Date;

  @HasMany(() => Ingredients)
  @Field(type => [Ingredients], { nullable: 'items' })
  ingredients: Ingredients[];
}
