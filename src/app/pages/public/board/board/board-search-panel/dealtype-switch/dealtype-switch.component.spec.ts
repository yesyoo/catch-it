import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealtypeSwitchComponent } from './dealtype-switch.component';

describe('DealtypeSwitchComponent', () => {
  let component: DealtypeSwitchComponent;
  let fixture: ComponentFixture<DealtypeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealtypeSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealtypeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
