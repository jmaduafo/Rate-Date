type User = {
    id: string;
}

export type UserProp = {
    userID: User[] | undefined | null;
}

export type DateDataProps = {
    id: string;
    date_name: string;
    date_age?: number;
    short_desc?: string;
    duration_of_dating?: number | null;
    duration_metric?: string;
    icks?: string[];
    green_flags?: string[];
    red_flags?: string[];
    rating?: number | null;
    image?: string | null;
    is_seeing?: boolean | null;
    nsfw?: boolean | null;
    nsfw_oral_skills?: number | null;
    nsfw_stroke_game?: number | null;
    nsfw_kissing_skills?: number | null;
    nsfw_creativity?: number | null;
    nsfw_kink_level?: number | null;
    nsfw_dirty_talk?: number | null;
    nsfw_big_o?: boolean | null;
    user_id: string;
    physical_attraction?: number | null;
    emotional_attraction?: number | null;
    additional_desc?: string | null;
    first_meet?: string | null;
    date_schedule?: Date | string | null;
    relationship_status?: string | null;
}