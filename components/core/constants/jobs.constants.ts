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
