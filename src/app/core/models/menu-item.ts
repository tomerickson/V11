export interface IMenuItem {
    route: string;
    icon: string | null;
    text: string;
    link: string | null;
    subMenu?: IMenuItem[];
    }
