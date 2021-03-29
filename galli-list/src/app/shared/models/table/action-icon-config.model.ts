export class ActionIconConfig {
    name?: string;
    class?: string;
    title?: string;
    actionName?: string;
    text?: string;
    color?: string;
    canLoad?: (arg: any) => boolean;
    onClick?: (args: any) => void;
}