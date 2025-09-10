import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormulaires } from './list-formulaires';

describe('ListFormulaires', () => {
  let component: ListFormulaires;
  let fixture: ComponentFixture<ListFormulaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFormulaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFormulaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
