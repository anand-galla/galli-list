import { 
    state, 
    style, 
    trigger,
    animate, 
    transition, 
    AnimationTriggerMetadata,
    keyframes, 
} from "@angular/animations";

export const toastAnimations: {
    readonly fadeToast: AnimationTriggerMetadata
} = {
    fadeToast: trigger('fadeAnimation', [
        state('default', style({ opacity: 1 })),
        transition('void => *',  animate('{{fadeIn}}ms', keyframes([
            style({
                opacity: 0,
                bottom: '-15px',
            }),
            style({
                opacity: 0.8,
                bottom: '-3px',
            }),
            style({
                opacity: 1,
                bottom: '0',
            }),
        ]))),
        transition('default => closing', animate('{{fadeOut}}ms', keyframes([
            style({
                opacity: 0.6,
                bottom: 0,
            }),
            style({
                opacity: 0.1,
                bottom: '-3px',
            }),
            style({
                opacity: 0,
                bottom: '-15px',
            }),
        ]))),
    ])
};

export type ToastAnimationState = 'none' | 'default' | 'closing';