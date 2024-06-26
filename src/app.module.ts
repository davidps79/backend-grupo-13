import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EbooksModule } from './ebooks/ebooks.module';
import { SeederModule } from './seed/seed.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({isGlobal: true,}), 
    AuthModule,
    EbooksModule,
    SeederModule,
    PaymentModule,
    OrderModule,
    ShoppingCartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
