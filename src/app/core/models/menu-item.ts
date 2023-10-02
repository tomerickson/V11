export interface IMenuItem {
    id: number | undefined;
    route: string;
    icon: string | null;
    text: string;
    link: string | null;
    expanded?: boolean;
    parent: number | undefined;
    show: boolean | undefined;
    }
