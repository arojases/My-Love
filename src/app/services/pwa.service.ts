import { Injectable, signal } from '@angular/core';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

@Injectable({ providedIn: 'root' })
export class PwaService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  readonly canInstall = signal(false);
  readonly isStandalone = signal(false);
  readonly showIosHint = signal(false);

  init(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.isStandalone.set(this.detectStandalone());
    this.showIosHint.set(this.detectIos() && !this.isStandalone());

    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.handleAppInstalled);
  }

  async install(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    await this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;
    const accepted = choice.outcome === 'accepted';

    if (accepted) {
      this.resetPromptState();
    }

    return accepted;
  }

  private readonly handleBeforeInstallPrompt = (event: Event): void => {
    event.preventDefault();
    this.deferredPrompt = event as BeforeInstallPromptEvent;
    this.canInstall.set(true);
  };

  private readonly handleAppInstalled = (): void => {
    this.isStandalone.set(true);
    this.showIosHint.set(false);
    this.resetPromptState();
  };

  private resetPromptState(): void {
    this.deferredPrompt = null;
    this.canInstall.set(false);
  }

  private detectStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches
      || ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
  }

  private detectIos(): boolean {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }
}
