import { Injectable } from '@nestjs/common';
import { CreateJiraWebHookDto } from './dto/create-jira-web-hook.dto';
import { UpdateJiraWebHookDto } from './dto/update-jira-web-hook.dto';
import { JiraRespondeDto } from './dto/jira-response.dto';
import { CoreService } from '../../../core/services/auth/core_service';

@Injectable()
export class JiraWebHookService {
  constructor(private readonly coreService: CoreService) {}
  async listenWebhook(payload: JiraRespondeDto) {
    const jiraData = payload;

    switch (jiraData.webhookEvent) {
      case 'jira:issue_created':
        try {
          await this.createIssue(jiraData, '1');
        } catch (error) {
          console.log('Falha ao gravar dados da issue:' + error);
          break;
        }
        console.log('Nova issue gravada com sucesso');
        break;

      case 'jira:issue_updated':
        console.log('issue updated');
        break;
      case 'jira:issue_deleted':
        console.log('issue deleted');
        break;
    }
  }

  async createIssue(jiraData: JiraRespondeDto, userId: string) {
    const query =
      'INSERT INTO "JIRA_MODEL" (UUID_TASK, USER_UUID, TASK_NAME, TASK_LEVEL, TASK_POINTS, TASK_DESCRIPTION, TASK_STATUS) values (?, ?, ?, ?, ?, ?, ?)';

    const params = [
      jiraData.issue.id,
      userId,
      jiraData.issue.key,
      1,
      1,
      jiraData.issue.fields.description,
      jiraData.issue.fields.summary,
    ];

    try {
      await this.coreService.executeQuery(query, params);
      console.log('Nova issue gravada com sucesso');
    } catch (error) {
      console.error('Falha ao gravar dados da issue:', error);
      throw new Error('Falha ao gravar dados da issue');
    }
  }
}
