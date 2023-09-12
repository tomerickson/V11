const months: string[] = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

export const parseDate = (input: string): Date => {

    let date = new Date(0);
    const regex = RegExp('^(\\d{2}).(\\w{3}).(\\d{4}).(\\d{2}).(\\d{2}).(\\d{2})$');
    const match:RegExpMatchArray | null= input.match(regex)

    if (match && match.length > 6) {
    const year: number = +match[3];
    const month: number = months.findIndex(mon => mon === match[2].toLowerCase());
    const day: number = +match[1];
    const hour: number = +match[4];
    const min: number = +match[5];
    const sec: number = +match[6];
    date = new Date(year, month, day, hour, min, sec);
    }
    return date;
}
