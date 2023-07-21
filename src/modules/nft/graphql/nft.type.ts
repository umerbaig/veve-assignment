import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../shared/graphql/common';

@ObjectType()
export class Nft {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  blockchainLink: string;

  @Field((type) => String)
  description: string;

  @Field((type) => String)
  imageUrl: string;

  @Field((type) => Date)
  minDate: Date;
}

@ObjectType()
export class NftsResp {
  @Field((type) => [Nft])
  edges: Nft[];
  @Field((type) => PageInfo)
  page_info: PageInfo;
}
