import { Test, TestingModule } from '@nestjs/testing';
import { JiraWebHookController } from './jira-web-hook.controller';
import { JiraWebHookService } from './jira-web-hook.service';

describe('JiraWebHookController', () => {
  let controller: JiraWebHookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JiraWebHookController],
      providers: [JiraWebHookService],
    }).compile();

    controller = module.get<JiraWebHookController>(JiraWebHookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
