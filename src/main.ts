import * as swaggerUi from 'swagger-ui-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yamljs';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const swaggerDir = join(__dirname, '..', 'swagger-doc');

  // const swaggerFiles = fs
  //   .readdirSync(swaggerDir)
  //   .filter((file) => file.endsWith('.yaml'));

  // let swaggerDocument: any = {
  //   openapi: '3.0.0',
  //   info: {
  //     title: 'API Documentation',
  //     version: '1.0.0',
  //   },
  //   paths: {},
  //   components: {},
  //   tags: [],
  // };

  // swaggerFiles.forEach((file) => {
  //   const filePath = path.join(swaggerDir, file);
  //   const yamlContent = YAML.load(filePath);

  //   swaggerDocument = mergeSwaggerDocuments(swaggerDocument, yamlContent);
  // });

  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  await app.listen(3000);
}

// function mergeSwaggerDocuments(mainDoc: any, additionalDoc: any): any {
//   return {
//     ...mainDoc,
//     paths: {
//       ...mainDoc.paths,
//       ...additionalDoc.paths,
//     },
//     components: {
//       ...mainDoc.components,
//       ...additionalDoc.components,
//     },
//     tags: [...mainDoc.tags, ...(additionalDoc.tags || [])],
//   };
// }

bootstrap();
