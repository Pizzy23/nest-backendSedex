import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';


import { BaseService } from './services';

import { GeoCodeService } from './services/cep/geoCode.service';
import { CepService } from './services/cep/cep.service';
import { RequestLoggerMiddleware } from './config';
import { CepController } from './controllers';

@Module({
  imports: [],
  controllers: [CepController],
  providers: [BaseService,  CepService, GeoCodeService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
