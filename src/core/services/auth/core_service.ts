import { Injectable } from '@nestjs/common';
import * as db from 'node-firebird';
import { firebirdConfig } from 'src/main';

@Injectable()
export class CoreService {
  async executeQuery(query: string, params: any[] = []) {
    return new Promise<any>((resolve, reject) => {
      db.attach(firebirdConfig, (err, db) => {
        if (err) {
          reject(err);
          return;
        }

        db.query(query, params, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          // Feche a conexão após a consulta
          db.detach();

          resolve(result);
        });
      });
    });
  }
}
