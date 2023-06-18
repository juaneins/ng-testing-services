import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highlight') bgColor = '';

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.background = this.defaultColor;
  }
  ngOnChanges(): void {
    this.elementRef.nativeElement.style.background =
      this.bgColor || this.defaultColor;
  }
}
