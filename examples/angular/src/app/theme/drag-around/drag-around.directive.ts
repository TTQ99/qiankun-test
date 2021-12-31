import { Directive, ElementRef, HostListener } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Directive({
  selector: '[appDragAround]'
})
export class DragAroundDirective {

  constructor(private eventManager: EventManager) {
    
  }

  ngOnInit(): void {
    this.eventManager.addGlobalEventListener('window', 'keydown', (e) => {
      if (e.keyCode == 39) {
        if (document.querySelector('.app-relation-modal .ant-table-body').scrollLeft >= document.querySelector('.app-relation-modal .ant-table-body').scrollWidth) {
          document.querySelector('.app-relation-modal .ant-table-body').scrollLeft = document.querySelector('.app-relation-modal .ant-table-body').scrollWidth;
        } else {
          document.querySelector('.app-relation-modal .ant-table-body').scrollLeft += 50;
        }
      }
      if (e.keyCode == 37) {
        if (document.querySelector('.app-relation-modal .ant-table-body').scrollLeft <= 0) {
          document.querySelector('.app-relation-modal .ant-table-body').scrollLeft = 0;
        } else {
          document.querySelector('.app-relation-modal .ant-table-body').scrollLeft -= 50;
        }
      }
    });
  }

}
