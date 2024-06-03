type User = {
  id: string;
};

export type UserProp = {
  userID: User[] | undefined | null;
};

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
  date_schedule?: Date | undefined | null;
  relationship_status?: string | null;
  ethnicity?: string | null;
};

export type EthnicDataProps = {
  id?: string;
  date_name?: string;
  user_id?: string;
  ethnicity: string | null;
  ethnicityCount: number;
};

export type ScheduleChartDataProps = {
  id?: string;
  date_name?: string;
  user_id?: string;
  date_schedule: string | null;
  date_schedule_count: number;
};

export type FollowProps = {
  id: string;
  user_id: string;
  follow_id: string | undefined;
}

export type UserDataProps = {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  sexual_orientation?: string | null;
  bio?: string;
  birthday?: string | null;
  dark_mode?: boolean;
  private?: boolean;
  pronouns?: string | null;
  image?: string | null;
  followers?: FollowProps;
};

export type ReactionDataProps = {
  id?: string;
  reaction?: string;
  user_id: string;
};

export type ImageProps = {
  imagePreview: any;
  file: File | null;
};

export type CommentProps = {
    id?: string;
    content?: string;
    user_id?: string;
    corner_id?: string;
    users?: UserDataProps;
    created_at?: string;
}

export type ReplyProps = {
    id?: string;
    content?: string;
    user_id?: string;
    comment_id?: string;
    users?: UserDataProps;
    reply_username?: string | undefined;
    created_at?: string;
}

export type OtherProps = {
    id?: string;
    user_id?: string;
    corner_id?: string;
}


export type PostProps = {
  id: string;
  title?: string;
  content?: string;
  date_type?: 'Date Idea' | 'Date Story';
  category?: string;
  image?: string | null;
  location?: string | null;
  tags?: string[] | null;
  cost?: string | null;
  is_nsfw?: boolean;
  is_mature?: boolean;
  user_id?: string;
  user?: UserDataProps;
  likes?: OtherProps[];
  saves?: OtherProps[];
  comments?: CommentProps[];
  replies?: ReplyProps[];
  views?: number;
  created_at?: string;
};

export type RecommendedProps = {
  id: string;
  title?: string;
  content?: string;
  date_type?: 'Date Idea' | 'Date Story';
  category?: string;
  image?: string | null;
  location?: string | null;
  tags?: string[] | null;
  cost?: string | null;
  is_nsfw?: boolean;
  is_mature?: boolean;
  user_id?: string;
  user?: UserDataProps;
  likes?: OtherProps[];
  saves?: OtherProps[];
  comments?: CommentProps[];
  views?: number;
  created_at?: string;
  points?: number;
};
