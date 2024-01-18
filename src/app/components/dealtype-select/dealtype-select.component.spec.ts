import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealtypeSelectComponent } from './dealtype-select.component';

describe('DealtypeSelectComponent', () => {
  let component: DealtypeSelectComponent;
  let fixture: ComponentFixture<DealtypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealtypeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealtypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
