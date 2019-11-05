import { TestBed } from '@angular/core/testing';

import { DocumentStoreService } from './document-store.service';

describe('DocumentStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentStoreService = TestBed.get(DocumentStoreService);
    expect(service).toBeTruthy();
  });
});
