import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import axios from 'axios';
import * as pluscodes from 'pluscodes';

@Injectable()
export class GeoCodeService extends BaseService {
  constructor() {
    super();
  }
  async getCoordinatesByAddress(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: address,
            key: process.env.MAPS,
          },
        },
      );

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry.location;
        return { lat, lng };
      }

      throw new Error('Nenhum resultado encontrado para o endereço fornecido.');
    } catch (error) {
      throw new Error(
        'Erro ao obter coordenadas geográficas: ' + error.message,
      );
    }
  }

  async getCepByCoordinates(lat: number, lng: number): Promise<string> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: process.env.MAPS,
          },
        },
      );

      const results = response.data.results;
      if (results && results.length > 0) {
        const addressComponents = results[0].address_components;
        const postalCodeComponent = addressComponents.find((component) =>
          component.types.includes('postal_code'),
        );

        if (postalCodeComponent) {
          return postalCodeComponent.long_name;
        } else {
          throw new Error(
            'Nenhum CEP encontrado para as coordenadas fornecidas.',
          );
        }
      } else {
        throw new Error(
          'Nenhum resultado encontrado para as coordenadas fornecidas.',
        );
      }
    } catch (error) {
      throw new Error('Erro ao obter o CEP: ' + error.message);
    }
  }
  async plusCode(adress: string) {
    const coords = await this.getCoordinatesByAddress(adress);
    return this.encodePlusCode(coords.lat, coords.lng);
  }
  encodePlusCode(latitude: number, longitude: number): string {
    return pluscodes.encode({
      latitude: latitude,
      longitude: longitude,
    });
  }

  decodePlusCode(plusCode: string): { latitude: number; longitude: number } {
    return pluscodes.decode(plusCode);
  }
}
