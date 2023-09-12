import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from './modules/user/models/user.model';
import { ProductModel } from './modules/product/models/product.model';
import { OrderModel } from './modules/order/models/order.model';

import { AuthModule } from './common/auth/auth.module';
import { InvoiceModel } from './modules/invoice/models/invoice.model';
import { InvoiceModule } from './modules/invoice/invoice.module';
//import { join } from 'path';

const entities = [UserModel, ProductModel, OrderModel, InvoiceModel];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.get('DB_HOST'),
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        //entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,

    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
