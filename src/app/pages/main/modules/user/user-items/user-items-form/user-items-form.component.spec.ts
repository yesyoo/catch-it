import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemsFormComponent } from './user-items-form.component';

describe('UserItemsFormComponent', () => {
  let component: UserItemsFormComponent;
  let fixture: ComponentFixture<UserItemsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
