import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetail } from './club-detail';

describe('ClubDetail', () => {
  let component: ClubDetail;
  let fixture: ComponentFixture<ClubDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
