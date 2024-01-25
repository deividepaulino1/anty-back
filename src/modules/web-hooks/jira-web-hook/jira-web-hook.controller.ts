import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JiraWebHookService } from './jira-web-hook.service';

@Controller('jira')
export class JiraWebHookController {
  constructor(private readonly jiraWebHookService: JiraWebHookService) {}

  @Post('hook')
  handleWebhook(@Body() payload: any) {
    return this.jiraWebHookService.listenWebhook(payload);
  }

}
