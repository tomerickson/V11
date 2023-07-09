export interface LenrEventDetail {
    id: number;
    category: string;
    year: number;
    idcopy: number;
    author: string;
    title: string;
    journal: string;
    editor: string;
    pubisher: string;
    city: string;
    date: Date;
    comment: string;
    keywords: string[];
    abstract: string;
    citations: string[];
    headline: string;
    hyperlinks: string[];
}