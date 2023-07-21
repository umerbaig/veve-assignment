import { INft } from '../interfaces/nft.interface';
const date = new Date('2023-06-22 01:24:07.780877+05');

export const nft: INft = {
  name: 'test',
  description: 'test',
  blockchainLink: 'test',
  imageUrl: 'test',
  minDate: date,
};

export const nfts: INft[] = [
  {
    name: 'test',
    description: 'test',
    blockchainLink: 'test',
    imageUrl: 'test',
    minDate: date,
  },
];
