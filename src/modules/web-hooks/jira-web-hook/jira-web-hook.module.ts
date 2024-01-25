import { Module } from '@nestjs/common';
import { JiraWebHookService } from './jira-web-hook.service';
import { JiraWebHookController } from './jira-web-hook.controller';
import { CoreService } from 'src/core/services/auth/core_service';

@Module({
  controllers: [JiraWebHookController],
  providers: [JiraWebHookService, CoreService],
})
export class JiraWebHookModule {}
