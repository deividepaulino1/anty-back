import { PartialType } from '@nestjs/mapped-types';
import { CreateJiraWebHookDto } from './create-jira-web-hook.dto';

export class UpdateJiraWebHookDto extends PartialType(CreateJiraWebHookDto) {}
