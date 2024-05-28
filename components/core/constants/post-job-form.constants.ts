export const employmentOptions = [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contractor', value: 'Contractor' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Volunteer', value: 'Volunteer' },
]

export const jobRolesOptions = [
    { label: "Instructional", value: "Instructional" },
    { label: "Non-instructional", value: "Non-instructional" }
]

export const compensationTypesOptions = [
    { label: "Salary", value: "Salary" },
    { label: "Hourly", value: "Hourly" }
]

export const applyMethodOptions = [
    { label: "By Apply URL", value: "URL" },
    { label: "Email", value: "Email" },
]

export const formStepsOptions = [
    { name: "Organization Information", href: "/post-a-job", status: "current" },
    { name: "Job Details", href: "/post-a-job/job-details", status: "upcoming" },
    {
        name: "Application Details",
        href: "/post-a-job/application-details",
        status: "upcoming",
    },
    {
        name: "Review Information",
        href: "/post-a-job/review-information",
        status: "upcoming",
    },
]

export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
];

export const salaryRange = [
    "$20,000", "$25,000", "$30,000", "$35,000", "$40,000",
    "$45,000", "$50,000", "$55,000", "$60,000", "$65,000",
    "$70,000", "$75,000", "$80,000", "$85,000", "$90,000",
    "$95,000", "$100,000", "$105,000", "$110,000", "$115,000",
    "$120,000", "$125,000", "$130,000", "$135,000", "$140,000",
    "$145,000", "$150,000", "$155,000", "$160,000", "$165,000",
    "$170,000", "$175,000", "$180,000", "$185,000", "$190,000",
    "$195,000", "$200,000"
]

export const hourlyRange = [
    "$10", "$15", "$20", "$25", "$30", "$35", "$40", "$45", "$50",
    "$55", "$60", "$65", "$70", "$75", "$80", "$85", "$90", "$95",
    "$100", "$105", "$110", "$115", "$120", "$125", "$130", "$135",
    "$140", "$145", "$150"
]
