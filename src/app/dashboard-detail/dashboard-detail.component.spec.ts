import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { convertToParamMap} from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { DashboardDetailComponent } from './dashboard-detail.component';
import { Observable, of, from} from 'rxjs';

describe('DashboardDetailComponent', () => {
  let component: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [ DashboardDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of([{ id: '1'}]) }
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
