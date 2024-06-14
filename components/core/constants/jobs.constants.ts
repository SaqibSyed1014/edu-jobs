export const jobFilters = [
    {
        fieldName: 'employment_type',
        type: 'checkbox',
        title: 'Employment Type',
        icon: 'SvgoClock',
        list: [
            {
                label: 'Full-time',
                value: 'Full-time',
                checked: false,
                counts: 0
            },
            {
                label: 'Part-time',
                value: 'Part-time',
                checked: false,
                counts: 0
            },
            {
                label: 'Internship',
                value: 'Internship',
                checked: false,
                counts: 0
            },
            {
                label: 'Volunteer',
                value: 'Volunteer',
                checked: false,
                counts: 0
            }
        ],

    },
    {
        fieldName: 'job_role',
        type: 'checkbox',
        title: 'Role Type',
        icon: 'SvgoBarChart',
        list: [
            {
                label: 'Instructional',
                value: 'Instructional',
                checked: false,
                counts: 0
            },
            {
                label: 'Non-instructional',
                value: 'Non-instructional',
                checked: false,
                counts: 0
            }
        ]
    },
    {
        fieldName: 'experience_level',
        type: 'checkbox',
        title: 'Experience Level',
        icon: 'SvgoLineChartUp',
        list: [
            {
                label: 'Entry-level',
                value: 'Entry-level',
                checked: false,
                counts: 0,
                tooltipText: 'New graduates or first-year teachers'
            },
            {
                label: 'Early Career',
                value: 'Early Career',
                checked: false,
                counts: 0,
                tooltipText: '1-5 years of experience'
            },
            {
                label: 'Mid-level',
                value: 'Mid-Level',
                checked: false,
                counts: 0,
                tooltipText: '5-10 years of experience'
            },
            {
                label: 'Experienced',
                value: 'Experienced',
                checked: false,
                counts: 0,
                tooltipText: 'Over 10 years of experience'
            },
            {
                label: 'Leadership',
                value: 'Leadership',
                checked: false,
                counts: 0,
                tooltipText: 'Principals, vice-principals, or district-level administrators'
            }
        ],
    },
    {
        type: 'range',
        title: 'Compensation',
        icon: 'SvgoCurrencyDollar',
        hasSwitcher: true,
        isSalaryRange: true,
        salary: {
            min: 20000,
            max: 200000
        },
        hourly: {
            min: 10,
            max: 100
        }
    }
]

export const itemsViewOptions = [
    {
        label: 'List',
        icon: 'SvgoList'
    },
    {
        label: 'Grid',
        icon: 'SvgoGrid'
    }
]

interface CompensationResult {
    min :number,
    max:number,
    type: string
}

export function extractMinMaxCompensationValues(compensationFilters :string) :CompensationResult  {
    const result :Partial<CompensationResult> = {};
    const conditions :string[] = compensationFilters.split('&&');
    conditions.forEach((condition :string) => {
        // @ts-ignore
        const [, key, type, value] = condition.match(/(min|max)_(salary|hourly):[><=]+(\d+)/);
        if (key === 'min') result.min = Number(value);
        else if (key === 'max') result.max = Number(value);
        result.type = type;
    });
    return result as CompensationResult;
}

export function extractSpecificFilterValues(filterString :string, filterName :'compensation' | 'checkboxes') {
    let extractedFilters :string = '';
    if (filterName === 'compensation') {
        extractedFilters = filterString.replace(/(min_(salary|hourly):>=\d+&&max_(salary|hourly):<=\d+&&)/, '');
    }
    return extractedFilters;
}

export function getFilterByQuery(compensationFilters :string, cbFilters :string) {
    let finalQuery = [];
    finalQuery.push(`date_posting_expires:<=${convertTodayInUnixTimeStamp()}`);
    if (compensationFilters.length) finalQuery.push(compensationFilters);
    if (cbFilters.length) finalQuery.push(cbFilters);
    console.log('final query ', finalQuery)
    return finalQuery.join('&&');
}

export function convertTodayInUnixTimeStamp() {
    const now = new Date();
    // Create a date object for today at midnight UTC
    const todayMidnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    // Get the Unix timestamp (in milliseconds) and divide by 1000 to convert to seconds
    return Math.floor(todayMidnightUTC.getTime() / 1000);
}

export function convertUnixTimestamp(timestamp :number) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function setCompensationToInitialValues(wageType :string) :number[] {
    if (wageType === 'salary') return [20000, 200000];
    return [10, 200];
}
