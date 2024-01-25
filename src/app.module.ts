import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JiraWebHookModule } from './modules/web-hooks/jira-web-hook/jira-web-hook.module';

@Module({
  imports: [JiraWebHookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
