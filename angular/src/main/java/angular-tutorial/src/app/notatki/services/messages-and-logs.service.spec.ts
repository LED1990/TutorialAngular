import { TestBed } from '@angular/core/testing';

import { MessagesAndLogsService } from './messages-and-logs.service';

describe('MessagesAndLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesAndLogsService = TestBed.get(MessagesAndLogsService);
    expect(service).toBeTruthy();
  });
});
