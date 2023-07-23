import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MfacApisService } from './mfac-apis.service';
import { CreateMfacApiDto } from './dto/create-mfac-api.dto';
import { UpdateMfacApiDto } from './dto/update-mfac-api.dto';

@Controller('mfac-apis')
export class MfacApisController {
  constructor(private readonly mfacApisService: MfacApisService) {}

  @Post('create-table')
  create(@Body() createMfacApiDto: any) {
    return this.mfacApisService.create(createMfacApiDto);
    // return {message: "Data received"}
  }

  @Post('get-all')
  getAll(@Body() body: any) {
    return this.mfacApisService.getAll(body);
  }

  @Post('get-one-by-name')
  getOneByName(@Body() body: any) {
    return this.mfacApisService.getOneByName(body);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMfacApiDto: UpdateMfacApiDto) {
  //   return this.mfacApisService.update(+id, updateMfacApiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mfacApisService.remove(+id);
  // }
}
