import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizareDoctoriComponent } from './vizualizare-doctori.component';

describe('VizualizareDoctoriComponent', () => {
  let component: VizualizareDoctoriComponent;
  let fixture: ComponentFixture<VizualizareDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VizualizareDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizareDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
