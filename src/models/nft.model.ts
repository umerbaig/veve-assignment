import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, Length, IsNumber } from 'class-validator';

@Entity()
export class NftModel {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @Length(4, 100)
  name: string;

  @Column('text')
  description: string;

  @Column()
  blockchainLink: string;

  @Column()
  imageUrl: string;

  @Column()
  owner: number;

  @Column()
  @IsDate()
  minDate: Date;
}
