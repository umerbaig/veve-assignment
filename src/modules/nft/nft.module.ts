import { Logger, Module } from '@nestjs/common';

import { NftResolver } from './graphql/nft.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftModel } from '../../models/nft.model';
import { NftService } from './nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([NftModel])],
  providers: [NftResolver, NftService, Logger],
  exports: [TypeOrmModule],
})
export class NftModule {}
