import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.98)' }),
        animate(
          '360ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ],
      { optional: true }
    )
  ])
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(18px) scale(0.96)' }),
        stagger(70, [
          animate(
            '320ms cubic-bezier(0.21, 1, 0.32, 1)',
            style({ opacity: 1, transform: 'translateY(0) scale(1)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

export const toastAnimation = trigger('toastAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-14px) scale(0.94)' }),
    animate(
      '260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0) scale(1)' })
    )
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ opacity: 0, transform: 'translateY(-10px) scale(0.96)' })
    )
  ])
]);
