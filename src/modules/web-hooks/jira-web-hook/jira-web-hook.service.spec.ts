import { Test, TestingModule } from '@nestjs/testing';
import { JiraWebHookService } from './jira-web-hook.service';

describe('JiraWebHookService', () => {
  let service: JiraWebHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JiraWebHookService],
    }).compile();

    service = module.get<JiraWebHookService>(JiraWebHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
