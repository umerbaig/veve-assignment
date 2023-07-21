import { Field, ArgsType } from '@nestjs/graphql';
import { Pagination } from '../../../shared/graphql/common';

@ArgsType()
export class GetNftArgs {
  @Field((type) => Pagination)
  pagination: Pagination;
}

@ArgsType()
export class TransferNftArgs {
  @Field((type) => Number)
  id: number;

  @Field((type) => Number)
  newOwner: number;
}
