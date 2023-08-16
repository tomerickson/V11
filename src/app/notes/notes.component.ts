import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { CrudService } from '../core/services/crud.service';
import { forEachChild } from 'typescript';
// import { DynamicContentDirective } from '../shared/dynamic-content.directive';
// import { NoteContentComponent } from './note-content/note-content.component';

@Component({
  selector: 'mfmp-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, /* DynamicContentDirective */],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  content = signal<HTMLCollection>;
  ready = signal(false);
  crud = inject(CrudService);

  @ViewChild('mfmpContent') container!: ElementRef<HTMLDivElement>;

  // contentHost!: DynamicContentDirective;

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {

    let body!: HTMLBodyElement;
    this.subscriptions.add(
      this.crud.getPage('notes.php').subscribe((html) => {
        const parser = new DOMParser();
        body = parser
          .parseFromString(html, 'text/html')
          .querySelector('body') as HTMLBodyElement;

        while (true) {
          const element = body.children[0];
          if (element.tagName === 'H5') break;
          body.removeChild(element);
        }
        this.content(body.children);
      })
    );
  }

  ngAfterViewInit(): void {
    console.log(this.content);
    this.ready.set(true);
    // this.content().forEachChild(item => this.container.nativeElement.appendChild(item)))
    // this.content.foreach(item => this.container.nativeElement.append(item));

}

  loadComponent() {

/*     const viewContainerRef = this.contentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<NoteContentComponent>(NoteContentComponent);
    componentRef.instance.html = this.content;
    componentRef.hostView.markForCheck(); */
  }
}
