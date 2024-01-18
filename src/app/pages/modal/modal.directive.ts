import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ModalDirective]'
})
export class ModalDirective {
  private modals: string[] = [];


  constructor(private tpl: TemplateRef<any>,
              private vcr: ViewContainerRef,
              ) { }

  ngOnInit(): void {
    const viewRef = this.vcr.createEmbeddedView(this.tpl);
    const parent: HTMLElement | null = document.querySelector('.modal-host');

    viewRef.rootNodes.forEach((node: HTMLElement) => {
      const modalId: string = new Date().getTime() + '';
      if(modalId as string) {
        node.setAttribute('modal-id', modalId);
        this.modals.push(modalId);
        parent?.append(node);
      }
    })
  };
  ngOnDestroy(): void {
    if(Array.isArray(this.modals)) {
      this.modals.forEach(modal => {
        let modalEl = document.querySelector(`[modal-id="${modal}"]`) 
        modalEl?.remove()
      })
    };
  }
}
