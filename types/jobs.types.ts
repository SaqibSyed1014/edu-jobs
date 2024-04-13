interface Job {
    job_id: string
    date_created: string
    organization_name: string
    organization_id: string
    organization_slug: string
    organization_type?: string
    date_posted: Date
    date_posting_expires?: string
    start_date?: string
    job_title: string
    job_role: string
    grade_levels?: string[]
    subjects?: string[]
    job_description: string
    apply_url?: string
    apply_email?: string
    apply_method: string
    job_country: string
    job_city: string
    job_state: string
    job_location: string
    job_postal_code?: string
    job_logo?: string
    featured: string
    active: boolean
    employment_type_id?: string
    employment_type?: string
    geo_location?: string
    application_deadline?: string
}

interface JobHit {
    document: Job;
    highlight: Record<string, any>;
    highlights: any[];
}

interface JobResponseType {
    facet_counts: any[];
    found: number;
    hits: JobHit[];
    out_of: number;
    page: number;
    request_params: RequestParams;
    search_cutoff: boolean;
    search_time_ms: number;
}
