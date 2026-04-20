import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppToast {
  id: number;
  type: 'message' | 'success' | 'warning';
  title: string;
  body: string;
}

export interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly toastsSubject = new BehaviorSubject<AppToast[]>([]);
  private readonly heartsSubject = new BehaviorSubject<FloatingHeart[]>([]);

  readonly toasts$ = this.toastsSubject.asObservable();
  readonly hearts$ = this.heartsSubject.asObservable();

  pushToast(toast: Omit<AppToast, 'id'>): void {
    const item: AppToast = { ...toast, id: Date.now() + Math.trunc(Math.random() * 999) };
    this.toastsSubject.next([item, ...this.toastsSubject.value].slice(0, 4));

    window.setTimeout(() => {
      this.dismissToast(item.id);
    }, 3800);
  }

  dismissToast(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter((toast) => toast.id !== id));
  }

  spawnHearts(amount = 8): void {
    const hearts = Array.from({ length: amount }).map((_, index) => ({
      id: Date.now() + index,
      left: 8 + Math.random() * 84,
      duration: 2500 + Math.random() * 1800,
      delay: index * 90
    }));

    this.heartsSubject.next([...this.heartsSubject.value, ...hearts]);

    window.setTimeout(() => {
      const activeIds = new Set(hearts.map((heart) => heart.id));
      this.heartsSubject.next(this.heartsSubject.value.filter((heart) => !activeIds.has(heart.id)));
    }, 5000);
  }
}
