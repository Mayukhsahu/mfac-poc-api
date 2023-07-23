import { PartialType } from '@nestjs/mapped-types';
import { CreateMfacApiDto } from './create-mfac-api.dto';

export class UpdateMfacApiDto extends PartialType(CreateMfacApiDto) {}
