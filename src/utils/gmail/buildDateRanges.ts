interface DateRange {
    start: Date;
    end: Date;
    days: Date[];
}

export const buildDateRanges = (sortedDays: Date[]): DateRange[] => {
    if (sortedDays.length === 0) return [];

    const ranges: DateRange[] = [];
    let rangeStart = sortedDays[0];
    let rangeDays: Date[] = [sortedDays[0]];

    for (let i = 1; i < sortedDays.length; i++) {
        const prev = sortedDays[i - 1];
        const curr = sortedDays[i];
        const diffMs = curr.getTime() - prev.getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (diffMs === oneDayMs) {
            rangeDays.push(curr);
        } else {
            ranges.push({
                start: rangeStart,
                end: new Date(prev.getTime() + oneDayMs - 1),
                days: rangeDays,
            });
            rangeStart = curr;
            rangeDays = [curr];
        }
    }

    const last = sortedDays[sortedDays.length - 1];
    ranges.push({
        start: rangeStart,
        end: new Date(last.getTime() + 24 * 60 * 60 * 1000 - 1),
        days: rangeDays,
    });

    return ranges;
};
