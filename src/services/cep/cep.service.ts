import { HttpException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import * as correios from 'correios-brasil';
import { CallDto } from 'src/dto/cep/cep-dto';
import { GeoCodeService } from './geoCode.service';

@Injectable()
export class CepService extends BaseService {
  constructor(private readonly geo: GeoCodeService) {
    super();
  }
  async getAdressByCep(cep: string): Promise<any> {
    try {
      const adress = await correios.consultarCep(cep);
      return adress;
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      return null;
    }
  }
  async calls(input: CallDto) {
    try {
      const newCep = await this.createNewCep(input.cep);
      const coords = await this.geo.getCoordinatesByAddress(input.adress);
      const plusCode = this.geo.encodePlusCode(coords.lat, coords.lng);
      return {
        res: {
          plusCode: plusCode,
          coords: coords,
          cep: newCep,
        },
        status: 200,
      };
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e.message),
      });
    }
  }

  async createNewCep(cep: string) {
    try {
      const firtsNumbers = cep.slice(0, 3);
      const random = Math.floor(Math.random() * 90000) + 10000;
      const randomString = random.toString();
      const newCep = firtsNumbers + randomString;
      const cepConfirm = await this.getAdressByCep(newCep);
      if (cepConfirm.erro != 'true') {
        return await this.createNewCep(cep);
      }
      const cepFormat = newCep.slice(0, 5) + '-' + newCep.slice(5);

      return cepFormat;
    } catch (e) {
      console.log(e);
    }
  }
}
