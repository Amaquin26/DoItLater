import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandibleSidebarComponent } from './expandible-sidebar.component';

describe('ExpandibleSidebarComponent', () => {
  let component: ExpandibleSidebarComponent;
  let fixture: ComponentFixture<ExpandibleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandibleSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandibleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
