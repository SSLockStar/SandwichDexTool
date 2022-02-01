import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { MultiChainCapModule } from './multi-chain-cap/multi-chain-cap.module';

@Module({
  imports: [ConfigModule.forRoot(), CoinMarketCapModule, MultiChainCapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}