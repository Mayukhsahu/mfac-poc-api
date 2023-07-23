import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MfacApisModule } from './mfac-apis/mfac-apis.module';
import { SQLConnection } from './db-config';

@Module({
  imports: [TypeOrmModule.forRoot(SQLConnection), MfacApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
