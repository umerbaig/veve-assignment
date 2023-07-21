import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NftModel } from '../../../models/nft.model';
import { NftService } from '../nft.service';
import { nft, nfts } from './nft.seed';
import { Repository } from 'typeorm';
import { Promise } from 'bluebird';
import * as TypeMoq from 'typemoq';
import to from 'await-to-js';

describe('NftService', () => {
  let service: NftService;
  const nftModelMock = TypeMoq.Mock.ofType(Repository<NftModel>);

  beforeEach(async () => {
    nftModelMock
      .setup((x) => x.findAndCount())
      .returns(() => Promise.resolve(nfts as NftModel[]));

    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: getRepositoryToken(NftModel),
          useValue: nftModelMock.target,
        },
        NftService,
        Logger,
      ],
    }).compile();
    service = await module.get<NftService>(NftService);
  });

  afterEach(() => {
    nftModelMock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect.assertions(1);
  });

  describe('findAll', () => {
    it('should return all nfts by user id', async () => {
      nftModelMock
        .setup((x) => x.findAndCount())
        .returns(() => Promise.resolve(nfts as NftModel[]));

      const [err, data] = await to(service.findAll(10, 0, 2));
      expect(data).toMatchSnapshot();
    });

    it('should throw error that something went wrong', async () => {
      nftModelMock
        .setup((x) => x.findAndCount())
        .returns(() => Promise.reject(nfts as NftModel[]));

      const [err, data] = await to(service.findAll(10, 0, 2));
      expect(err).toMatchSnapshot();
    });
  });

  describe('transferNft', () => {
    it('should transfer nft to the new owner', async () => {
      nftModelMock
        .setup((x) => x.findOne({ where: { id: 1 } }))
        .returns(() => Promise.resolve(nft as NftModel));
      nftModelMock
        .setup((x) => x.update(1, { owner: 2 }))
        .returns(() => Promise.resolve(nft as NftModel));

      const [err, data] = await to(service.transferNft(1, 2, 3));
      expect(data).toMatchSnapshot();
    });

    it('should throw error that nft not found', async () => {
      nftModelMock
        .setup((x) => x.findOne({ where: { id: 9 } }))
        .returns(() => Promise.reject());

      const [err, data] = await to(service.transferNft(5, 2, 3));
      expect(err).toMatchSnapshot();
    });
  });
});
