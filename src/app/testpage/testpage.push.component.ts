import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILenrEventsRequest } from '../core/models/lenr-events-request.model';

@Component({
  selector: 'mfmp-testpage-push',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testpage.push.component.html',
  styleUrls: ['./testpage.push.component.scss']
})
export class TestpagePushComponent implements AfterViewInit {
  @Input({ required: true }) model!: ILenrEventsRequest;
  @ViewChild('form#f') formRef!: ElementRef;
  form!: HTMLFormElement;

  ngAfterViewInit(): void {
    this.getChildren();
  }
  getChildren = (): void => {
    this.form = this.formRef.nativeElement;
  };

  submit() {
    this.form.submit();
  }
}
