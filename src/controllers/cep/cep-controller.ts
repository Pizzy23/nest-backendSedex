import { Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CallDto, PlusDto } from 'src/dto/cep/cep-dto';
import { StringResDTO } from 'src/dto/response/response-dto';
import { CepService, GeoCodeService } from 'src/services';

@ApiTags('Cep')
@Controller('/cep')
export class CepController {
  constructor(
    private readonly cep: CepService,
    private readonly geo: GeoCodeService,
  ) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Create new CEP',
  })
  @Post('/cep')
  async getNewCep(@Headers() input: CallDto) {
    return await this.cep.calls(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Input your adress and get your PlusCode',
  })
  @Post('/plus')
  async getPlusCode(@Headers() input: CallDto) {
    return await this.geo.plusCode(input.adress);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Input coords by user and get your PlusCode',
  })
  @Post('/coords')
   getPlusCodeByCoords(@Headers() input: PlusDto) {
    return  this.geo.encodePlusCode(input.lat, input.long);
  }
}
