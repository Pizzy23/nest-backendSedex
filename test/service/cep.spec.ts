import { Test, TestingModule } from '@nestjs/testing';
import { GeoCodeService, CepService } from '../../src/services';
import { CepResponse, consultarCep } from 'correios-brasil';

jest.mock('./geoCode.service');
jest.mock('correios-brasil');


describe('CepService', () => {
  let cepService: CepService;
  let geoCodeService: GeoCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService, GeoCodeService],
    }).compile();

    cepService = module.get<CepService>(CepService);
    geoCodeService = module.get<GeoCodeService>(GeoCodeService);
  });

  it('should return null for invalid CEP', async () => {
    (
      consultarCep as jest.MockedFunction<typeof consultarCep>
    ).mockRejectedValue(new Error());

    const cep = '99999-999';
    const result = await cepService.getAdressByCep(cep);

    expect(result).toBeNull();
  });
});
