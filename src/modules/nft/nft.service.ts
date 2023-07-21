import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftModel } from '../../models/nft.model';
import { hasMoreRec } from '../../utils/index';
import { NftsResp, Nft } from './graphql/nft.type';
import {
  InternalServerError,
  NotFoundError,
} from '../../shared/errors/errors.messages';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftModel)
    private nftRepository: Repository<NftModel>,
    private logger: Logger,
  ) {}

  async findAll(
    limit: number,
    skip: number,
    userId: number,
  ): Promise<NftsResp> {
    try {
      const [results, total] = await this.nftRepository.findAndCount({
        where: { owner: userId },
        take: limit,
        skip,
      });

      return {
        page_info: {
          limit,
          skip,
          total,
          has_more: hasMoreRec(total, skip, limit),
        },
        edges: results,
      };
    } catch (err) {
      throw InternalServerError('Something went wrong');
    }
  }

  async transferNft(
    id: number,
    currentUserId: number,
    newUserId: number,
  ): Promise<Nft> {
    const nft = await this.nftRepository.findOne({
      where: { owner: currentUserId, id },
    });

    if (!nft) {
      throw NotFoundError('Nft not found!');
    }

    const updatedNft = await this.nftRepository.update(id, {
      owner: newUserId,
    });

    if (!updatedNft) {
      throw InternalServerError('Something went wrong');
    }

    return this.nftRepository.findOne({ where: { id } });
  }
}
