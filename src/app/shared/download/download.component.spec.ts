import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DownloadComponent } from "./download.component";


describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ DownloadComponent ],
      providers: [
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have fileTypes', () => { component.downloadOptions !== null });
});