import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorySelectComponent } from './subcategory-select.component';

describe('SubcategorySelectComponent', () => {
  let component: SubcategorySelectComponent;
  let fixture: ComponentFixture<SubcategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategorySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
