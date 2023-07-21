import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(type => Number)
  limit: number;

  @Field(type => Number)
  skip: number;

  @Field(type => Number)
  total: number;

  @Field(type => Boolean)
  has_more: boolean;
}

@InputType()
export class Pagination {
  @Field(type => Number)
  limit: number;

  @Field(type => Number)
  skip: number;
}
