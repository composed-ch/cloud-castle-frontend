import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmCardComponent } from './vm-card.component';

describe('VmCardComponent', () => {
  let component: VmCardComponent;
  let fixture: ComponentFixture<VmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
