import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderFilterComponent } from './board-header-filter.component';

describe('BoardHeaderFilterComponent', () => {
  let component: BoardHeaderFilterComponent;
  let fixture: ComponentFixture<BoardHeaderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardHeaderFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardHeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
