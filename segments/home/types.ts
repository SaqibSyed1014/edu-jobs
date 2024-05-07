interface PartnerLogo {
    display_order: number
    is_active: number
    logo_id: number
    logo_path: string
}

interface JobsInCities {
    job_city: string;
    job_state: string;
    job_count: number;
    company_count: number;
    lat: number;
    lng: number;
    photo_url: string;
    priority_rank: number;
}
