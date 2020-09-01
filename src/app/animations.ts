import { trigger, transition, style, animate } from '@angular/animations';

export var cubicBezier = "200ms cubic-bezier(.41,1.9,.62,1.16)";

export var box = trigger('box', [
    transition(':enter', [
      style({transform: 'scale(0.7)'}),
      animate(cubicBezier, style({transform: 'scale(1)'}))
    ]),
    transition(':leave', [
      style({transform: 'scale(1)' }), 
      animate(cubicBezier, style({transform: 'scale(0)'}))
    ])
  ])

export var popUpBox = trigger('popUpBox', [
    transition(':leave', [
      style({opacity: 1}),
      animate('200ms ease-out', style({opacity: 0}))
    ])
  ])