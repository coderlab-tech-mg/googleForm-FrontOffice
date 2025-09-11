import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireReponse } from './formulaire-reponse';

describe('FormulaireReponse', () => {
  let component: FormulaireReponse;
  let fixture: ComponentFixture<FormulaireReponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireReponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireReponse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
