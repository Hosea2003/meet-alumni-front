export type CreatePublication={
    content:string,
    image?:File|string
}

export type Publication={
    id:number
    author_name:string
    author_id:number
    author_pdp:string
    datePub:Date
    likesCount:number
    commentsCount:number
    have_liked:boolean
} & CreatePublication

export type CreateComment={
    comment:string
}

export type Comment={
    profile_image:string
    user_name:string
    id:number
    dateComment:Date
}&CreateComment