import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
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

  @Get('get-db-list')
  getAllDb() {
    return this.mfacApisService.getAllDb()
  }

  @Post('get-one-by-name')
  getOneByName(@Body() body: any) {
    return this.mfacApisService.getOneByName(body);
  }

  @Put('update-one')
  updateOne(@Body() body: any) { 
    return this.mfacApisService.updateOne(body)
  }

  @Delete('delete-row')
  deleteRowDb(@Body() body: any) {
    return this.mfacApisService.deleteRowDb(body);
  }
}
