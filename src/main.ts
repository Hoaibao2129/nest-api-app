import * as swaggerUi from 'swagger-ui-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Directory where Swagger YAML files are located
  const swaggerDir = join(__dirname, '..', 'swagger-doc');

  // Read all YAML files from the directory
  const swaggerFiles = fs
    .readdirSync(swaggerDir)
    .filter((file) => file.endsWith('.yaml'));

  // Merge all YAML files into a single Swagger document
  let swaggerDocument = {};
  swaggerFiles.forEach((file) => {
    const filePath = path.join(swaggerDir, file);
    const yamlContent = YAML.load(filePath);
    swaggerDocument = { ...swaggerDocument, ...yamlContent };
  });

  // Set up Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  await app.listen(3000);
}

bootstrap();
