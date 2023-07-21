import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import appConfig from './config/app.config';
import { formatError } from './utils/formatError';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NftModule } from './modules/nft/nft.module';
import { HealthModule } from './modules/health/health.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './shared/interceptor/timeout.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './utils/entities';

@Module({
  imports: [
    NftModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('app.db.host'),
        port: configService.get<number>('app.db.port'),
        username: configService.get<string>('app.db.username'),
        password: configService.get<string>('app.db.password'),
        database: configService.get<string>('app.db.name'),
        entities: Entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      formatError: (error) => formatError(error),
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
