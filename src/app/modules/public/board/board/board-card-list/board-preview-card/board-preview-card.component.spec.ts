import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPreviewCardComponent } from './board-preview-card.component';

describe('BoardPreviewCardComponent', () => {
  let component: BoardPreviewCardComponent;
  let fixture: ComponentFixture<BoardPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPreviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
