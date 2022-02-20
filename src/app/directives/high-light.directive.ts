import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  constructor(private el : ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('black', 'white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('', '');
  }

  private highlight(color: string, textColor:string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = textColor;
  }


}
