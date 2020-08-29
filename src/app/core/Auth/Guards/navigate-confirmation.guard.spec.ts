import { TestBed } from '@angular/core/testing';

import { NavigateConfirmationGuard } from './navigate-confirmation.guard';

describe('NavigateConfirmationGuard', () => {
  let guard: NavigateConfirmationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavigateConfirmationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
