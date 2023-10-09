export interface IMenuItem {
    id: number | undefined;
    route: string;
    icon: string | null;
    text: string;
    link: string | null;
    menu?: boolean;
    expanded?: boolean;
    parent: number | undefined;
    show: boolean | undefined;
    }
