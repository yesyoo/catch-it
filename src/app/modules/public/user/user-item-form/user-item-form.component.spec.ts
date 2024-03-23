import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemFormComponent } from './user-item-form.component';

describe('UserItemFormComponent', () => {
  let component: UserItemFormComponent;
  let fixture: ComponentFixture<UserItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
