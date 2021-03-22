export class ToastData {
   type: ToastType;
   message: string; 
   label: string;
   restrictAutoClose: boolean = false;
   duration: number;
   toolTip: string; //Use This Property To Show Custom Tooltip
   hideTooltip: boolean;
   componentType: any;

   constructor(args?: Partial<ToastData>) {
      this.message = args?.message;
      this.type = args?.type;
      this.restrictAutoClose = args?.restrictAutoClose;
      this.duration = args?.duration;
      this.toolTip = args?.toolTip;
      this.hideTooltip = args?.hideTooltip;
      this.componentType = args?.componentType;
   }

   public get animations() {
      return this.restrictAutoClose ? new ToastAnimationConfig({ fadeIn: 0, fadeOut: 0}) : new ToastAnimationConfig({ fadeIn: 1000, fadeOut: 1000});
   }

   public get iconClass(): string {
      return this.type === 'success' ? 'fa-check-circle' 
            : this.type === 'warning' ? 'fa-exclamation-triangle'
            : this.type === 'error' ? 'fa-times-circle'
            : 'fa-info-circle';
   }

   public get color(): string {
      return this.type === 'success' ? 'rgb(0, 135, 90)' 
            : this.type === 'warning' ? 'rgb(255, 153, 31)'
            : this.type === 'error' ? 'rgb(222, 53, 11)'
            : 'rgb(0, 82, 204)'
   }

   public get labelText(): string {
      return this.label?.length ? this.label 
            : this.type === 'success' ? 'Success'
            : this.type === 'error' ? 'Error'
            : this.type === 'warning' ? 'Warning'
            : 'Info' 
   }
}

export type ToastType = 'warning' | 'info' | 'error' | 'success';

export class ToastAnimationConfig {
   fadeIn: number;
   fadeOut: number;

   constructor(args?: any) {
      this.fadeIn = args?.fadeIn;
      this.fadeOut = args?.fadeOut;
   }
}
