import { Test, TestingModule } from '@nestjs/testing';
import { GeoCodeService } from '../../src/services/cep/geoCode.service';
import axios from 'axios';

jest.mock('axios');

describe('GeoCodeService', () => {
  let geoCodeService: GeoCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoCodeService],
    }).compile();

    geoCodeService = module.get<GeoCodeService>(GeoCodeService);
  });

  it('should get coordinates by address', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            geometry: {
              location: { lat: 40.712776, lng: -74.005974 },
            },
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const address = 'New York, USA';
    const coordinates = await geoCodeService.getCoordinatesByAddress(address);

    expect(coordinates).toEqual({ lat: 40.712776, lng: -74.005974 });
  });

  it('should throw error when no results found for address', async () => {
    const mockResponse = {
      data: {
        results: [],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const address = 'Invalid Address';
    await expect(
      geoCodeService.getCoordinatesByAddress(address),
    ).rejects.toThrowError(
      'Nenhum resultado encontrado para o endereço fornecido.',
    );
  });

  it('should get CEP by coordinates', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            address_components: [
              { long_name: '12345-678', types: ['postal_code'] },
              { long_name: 'New York', types: ['locality'] },
              { long_name: 'USA', types: ['country'] },
            ],
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const lat = 40.712776;
    const lng = -74.005974;
    const cep = await geoCodeService.getCepByCoordinates(lat, lng);

    expect(cep).toEqual('12345-678');
  });

  it('should throw error when no CEP found for coordinates', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            address_components: [
              { long_name: 'New York', types: ['locality'] },
              { long_name: 'USA', types: ['country'] },
            ],
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const lat = 40.712776;
    const lng = -74.005974;
    await expect(
      geoCodeService.getCepByCoordinates(lat, lng),
    ).rejects.toThrowError(
      'Nenhum CEP encontrado para as coordenadas fornecidas.',
    );
  });

  it('should encode PlusCode from coordinates', () => {
    const lat = 40.712776;
    const lng = -74.005974;
    const plusCode = geoCodeService.encodePlusCode(lat, lng);

    expect(plusCode).toBeDefined();
    expect(plusCode).toMatch(/^\w{8}\+\w{2}$/);
  });

  it('should decode PlusCode to coordinates', () => {
    const plusCode = '7FGX8VQ2+8Q';

    const decodedCoordinates = geoCodeService.decodePlusCode(plusCode);

    expect(decodedCoordinates).toEqual({
      latitude: 40.712776,
      longitude: -74.005974,
    });
  });
});
