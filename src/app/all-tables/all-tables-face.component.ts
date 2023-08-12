import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mfmp-all-tables-face',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './all-tables-face.component.html',
  styleUrls: ['./all-tables-face.component.scss']
})
export class AllTablesFaceComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  @Output() sql: EventEmitter<string | null> = new EventEmitter();

  @Input({ required: true }) set query(value: string | null) {
    if (this.form)
      this.form.get('query')?.patchValue(value, { emitEvents: false });
  }

  get query() {
    return this.form.get('query')?.value;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm = () => {
    this.form = this.fb.group({
      query: ['', [Validators.required]]
    });
  };

  runQuery() {
    this.sql.emit(this.query);
  }
}
