import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSearchFilterComponent } from './board-search-filter.component';

describe('BoardSearchFilterComponent', () => {
  let component: BoardSearchFilterComponent;
  let fixture: ComponentFixture<BoardSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
