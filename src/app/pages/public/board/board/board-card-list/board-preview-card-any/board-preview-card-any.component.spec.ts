import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPreviewCardAnyComponent } from './board-preview-card-any.component';

describe('BoardPreviewCardAnyComponent', () => {
  let component: BoardPreviewCardAnyComponent;
  let fixture: ComponentFixture<BoardPreviewCardAnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPreviewCardAnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPreviewCardAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
