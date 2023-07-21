import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Nft, NftsResp } from './nft.type';
import { NftService } from '../nft.service';
import { Logger } from '@nestjs/common';
import { GetNftArgs, TransferNftArgs } from './nft.args';
import { Auth, AuthUser } from '../../auth/auth.decorator';
import { IAuthUser, UserRoles } from '../../auth/interfaces/auth.interface';

@Resolver((returns) => Nft)
export class NftResolver {
  private logger: Logger;
  constructor(private readonly nftService: NftService) {
    this.logger = new Logger(NftResolver.name);
  }

  @Auth(UserRoles.CUSTOMER)
  @Query((returns) => NftsResp)
  async nfts(
    @Args() args: GetNftArgs,
    @AuthUser() user: IAuthUser,
  ): Promise<NftsResp> {
    return this.nftService.findAll(
      args?.pagination?.limit,
      args?.pagination?.skip,
      user?.user_id,
    );
  }

  @Auth(UserRoles.CUSTOMER)
  @Mutation((returns) => Nft)
  async transferNft(
    @Args() args: TransferNftArgs,
    @AuthUser() user: IAuthUser,
  ): Promise<Nft> {
    return this.nftService.transferNft(args?.id, user?.user_id, args?.newOwner);
  }
}
