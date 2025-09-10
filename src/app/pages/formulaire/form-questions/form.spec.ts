import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestion } from './form';

describe('Form', () => {
  let component: FormQuestion;
  let fixture: ComponentFixture<FormQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
