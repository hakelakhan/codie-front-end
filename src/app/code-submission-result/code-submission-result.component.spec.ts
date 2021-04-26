import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSubmissionResultComponent } from './code-submission-result.component';

describe('CodeSubmissionResultComponent', () => {
  let component: CodeSubmissionResultComponent;
  let fixture: ComponentFixture<CodeSubmissionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSubmissionResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSubmissionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
