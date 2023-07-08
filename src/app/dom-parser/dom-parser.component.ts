import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'mfmp-dom-parser',
  standalone: true,
  templateUrl: './dom-parser.component.html',
  styleUrls: ['./dom-parser.component.scss'],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule]
})

export class DomParserComponent implements OnInit {

  ngOnInit(): void {
    this.form = this.fb.group({
      html:[''],
      xPath:[''],
      result:['']
    });
  }

  fb = inject(FormBuilder);
  form!: FormGroup;
  html!: string;
  xPath!: string;
  result!: string;

  setXPath(event: any) {
    this.xPath = event!.target!.value;
  }


}
