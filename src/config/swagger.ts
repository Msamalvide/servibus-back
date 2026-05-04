import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerDocument = new DocumentBuilder()
  .setTitle('Documentacion Back')
  .setVersion('1.0.0')
  .setDescription('Documentacion del backend de ServiBus')
  .addBearerAuth()
  .build();