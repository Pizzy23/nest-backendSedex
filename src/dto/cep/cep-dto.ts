import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CallDto {
  @ApiProperty()
  @IsString()
  cep: string;
  @ApiProperty()
  @IsString()
  adress: string;
}

export class PlusDto {
  @ApiProperty()
  @IsNumber()
  lat: number;
  @ApiProperty()
  @IsNumber()
  long: number;
}
