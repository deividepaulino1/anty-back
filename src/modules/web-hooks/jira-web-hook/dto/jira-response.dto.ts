// webhook.dto.ts
export class JiraRespondeDto {
  id: number;
  timestamp: number;
  issue: {
    id: string;
    self: string;
    key: string;
    fields: {
      summary: string;
      created: string;
      description: string;
      labels: string[];
      priority: string;
    };
  };
  user: {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: {
      '16x16': string;
      '48x48': string;
    };
    displayName: string;
    active: string;
  };
  changelog: {
    items: {
      toString: string;
      to: string | null;
      fromString: string;
      from: string | null;
      fieldtype: string;
      field: string;
    }[];
    id: number;
  };
  comment: {
    self: string;
    id: string;
    author: {
      self: string;
      name: string;
      emailAddress: string;
      avatarUrls: {
        '16x16': string;
        '48x48': string;
      };
      displayName: string;
      active: boolean;
    };
    body: string;
    updateAuthor: {
      self: string;
      name: string;
      emailAddress: string;
      avatarUrls: {
        '16x16': string;
        '48x48': string;
      };
      displayName: string;
      active: boolean;
    };
    created: string;
    updated: string;
  };
  webhookEvent: string;
}
