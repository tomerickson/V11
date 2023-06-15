import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

/**
 * @title Clipboard overview
 *
 *@description Provides a text field that can be copied by clicking on the attached icon
 */
@Component({
  selector: 'code-copy',
  template: `
    <div (mouseenter)="mouseEnter()" (mouseleave)="mouseLeave()">
      <code #code [className]="'cold'">
        {{ text }}
      </code>
      <mat-icon
        #icon
        [classList]="['icon-display']"
        [style]="['visibility:hidden']"
        (click)="clicked()"
        [cdkCopyToClipboard]="text!">
        content_copy
      </mat-icon>
    </div>
  `,
  styles: [
    `
      .icon-display {
        transform: scale(0.5);
      }
      div {
        display:flex;
        flex-direction: row;
        align-items: center;
      }
      code {
        margin-right: 1ex;
      }
      mat-icon {
        visibility: hidden;
        cursor: pointer;
      }
      div:hover {
        :is(mat-icon) {
          visibility: visible;
        }
        :is(code) {
          opacity: '.5';
        }
      }
    `
  ],
  standalone: true,
  imports: [FormsModule, ClipboardModule, MatButtonModule, MatIconModule]
})
export class CodeCopyCompoonent implements AfterViewInit {
  @Input({ required: true }) text!: string | undefined;
  @ViewChild('button') buttonRef!: MatIconButton;
  @ViewChild('icon') iconRef!: MatIcon;
  @ViewChild('code') codeRef!: ElementRef;
  code!: HTMLElement;
  icon!: HTMLElement;
  toolTip = 'copied';

  ngAfterViewInit(): void {
    this.getChildren();
  }
  getChildren = () => {
    this.code = this.codeRef.nativeElement;
    this.icon = this.iconRef._elementRef.nativeElement;
  };

  mouseEnter = () => {
    if (this.icon) this.icon.title = '';
    if (this.icon) this.icon.style.visibility = 'visible';
     if (this.code) this.code.style.opacity = '.5';
    console.log('enter');
  };
  mouseLeave = () => {
    if (this.icon) this.icon.style.visibility = 'hidden';
    if (this.code) this.code.style.opacity = '1';
    console.log('leave');
  };

  clicked = () => {
    if (this.icon) this.icon.title = this.toolTip;
  }
}
