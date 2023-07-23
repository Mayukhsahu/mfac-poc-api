import { Injectable } from '@nestjs/common';
import { CreateMfacApiDto } from './dto/create-mfac-api.dto';
import { UpdateMfacApiDto } from './dto/update-mfac-api.dto';
import { getManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MfacApisService {
  async create(createMfacApiDto: any) {
    // console.log(createMfacApiDto)
    const __SCHEMA = "data_source_schema"
    let lastInsertedId: string
    const insertDataSrcQuery = `
    INSERT INTO ${__SCHEMA}.data_source
    (file_name, table_name)
    VALUES
    (?, ?)
    `
    const colNames = Object.keys(createMfacApiDto?.jsonArray[0])
    const premiumConfigColNamesTypes = colNames.map(col => `${col.toLowerCase().replaceAll(" ", "_")} VARCHAR(45)`)
    const premiumConfigColNames = colNames.map(col => `${col.toLowerCase().replaceAll(" ", "_")}`)
    const premiumConfigValues: any = createMfacApiDto?.jsonArray.map((values: any) => `${Object.values(values).map(item => `${item}`)}`)
    const tableName = createMfacApiDto?.fileName
    // [(7,5,6),'(7,5,6)',(7,5,6),("United states of america",5,6)]
    const entityManager = getManager()
    try {
      const dbResponse = await entityManager.query(insertDataSrcQuery, [createMfacApiDto?.fileName, tableName])
      lastInsertedId = await dbResponse.insertId
      const createTableQuery = `
        CREATE TABLE premium_config_schema.${tableName}_${lastInsertedId}(
          id INT NOT NULL AUTO_INCREMENT,${premiumConfigColNamesTypes.join(",")},PRIMARY KEY (id)
        );
      `
      await entityManager.query(createTableQuery)
      const placeHolders = Array(premiumConfigValues.length).fill(`(${Array(colNames.length).fill("?")})`).join(",")
      
      // console.log(placeHolders)
      const insertConfigs = `
        INSERT INTO premium_config_schema.${tableName}_${lastInsertedId}
          (${premiumConfigColNames.join(",")})
        VALUES
          ${placeHolders}
        ;`
      // console.log("values: ", premiumConfigValues.map(item => item.split(",")).flat())
      await entityManager.query(insertConfigs, premiumConfigValues.map(item => item.split(",")).flat())
      return {status: HttpStatus.OK, message: `${tableName} data inserted into the table`}
    } 
    catch(err) {
      return HttpStatus.INTERNAL_SERVER_ERROR
    }

  }

  async getAll(reqBody: any) {
    // console.log(reqBody)
    const dataSourceQuery = `
      SELECT 
        id 
      FROM 
        data_source_schema.data_source
      WHERE
        file_name = "${reqBody?.tableName}"
      ORDER BY id DESC
      LIMIT 1
      ;
    `
    
    const entityManager = getManager()
    try {
      const dataSrcResponse = await entityManager.query(dataSourceQuery)
      const tableId = await dataSrcResponse[0].id
      const rateConfigTableQuery = `
        SELECT * FROM premium_config_schema.${reqBody.tableName}_${tableId};
      `
      const premiumConfigResponse = await entityManager.query(rateConfigTableQuery)
      return premiumConfigResponse
      
    }
    catch(err) {
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Something went wrong!"}
    }
  }

  async getOneByName(reqBody: any) {
    const dataSourceQuery = `
      SELECT 
        id 
      FROM 
        data_source_schema.data_source
      WHERE
        file_name = "${reqBody?.tableName}"
      ORDER BY id DESC
      LIMIT 1
      ;
    `

    const entityManager = getManager()
    try {
      const dataSrcResponse = await entityManager.query(dataSourceQuery)
      const tableId = await dataSrcResponse[0].id
      const rateConfigTableQuery = `
        SELECT * FROM premium_config_schema.${reqBody.tableName}_${tableId}
        WHERE ${reqBody.tableName} = "${reqBody.rowName}"
        ;
      `
      const premiumConfigResponse = await entityManager.query(rateConfigTableQuery)
      return premiumConfigResponse
      
    }
    catch(err) {
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Something went wrong!"}
    }
  }

  // update(id: number, updateMfacApiDto: UpdateMfacApiDto) {
  //   return `This action updates a #${id} mfacApi`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mfacApi`;
  // }
}
