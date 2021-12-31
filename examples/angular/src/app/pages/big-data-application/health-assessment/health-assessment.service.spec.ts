import { TestBed } from '@angular/core/testing';

import { HealthAssessmentService } from './health-assessment.service';

describe('HealthAssessmentService', () => {
  let service: HealthAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
