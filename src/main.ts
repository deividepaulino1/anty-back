import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebird from 'node-firebird';

type CustomNestApplicationOptions = {
  contextIdFactory?: () => firebird.Database;
} & Parameters<typeof NestFactory.create>[2];

async function bootstrap() {
  // Configurações do Firebird
  const firebirdConfig: firebird.Options = {
    host: '127.0.0.1',
    port: 3050,
    database: 'C://projetos//anty//anty_back//db/ANTY.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
  };

  // Conectar ao banco de dados Firebird
  console.log('Conectando ao banco de dados Firebird...');
  const db = await new Promise<firebird.Database>((resolve, reject) => {
    firebird.attach(firebirdConfig, (err, db) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados Firebird', err);
        reject(err);
      } else {
        console.log('Conexão bem-sucedida ao banco de dados Firebird ');
        resolve(db);
      }
    });
  });

  // Criar opções do aplicativo NestJS
  const nestAppOptions: CustomNestApplicationOptions = {
    contextIdFactory: () => db, // Usar o objeto de conexão do Firebird como contexto
    // Adicione outras opções, se necessário
  };

  // Inicializar o aplicativo NestJS
  const app = await NestFactory.create(AppModule, undefined, nestAppOptions);

  // Inicializar o aplicativo NestJS após a conexão bem-sucedida ao banco de dados
  await app.listen(4000);

  console.log(`Teste log modify on: ${await app.getUrl()}`);
}

export const firebirdConfig = {
  host: '127.0.0.1',
  port: 3050,
  database: 'C://projetos//dj-pay-asaas//data/TESTE.FDB',
  user: 'SYSDBA',
  password: 'masterkey',
};

bootstrap();
