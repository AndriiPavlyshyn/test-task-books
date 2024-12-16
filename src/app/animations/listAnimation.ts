import { animate, query, stagger, style, transition, trigger } from '@angular/animations'


export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        stagger('100ms', animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ],
      { optional: true },
    ),
  ]),
])
