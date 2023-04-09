export interface User{
    user_id:number,
    first_name:string,
    last_name:string,
    birthdate:string|Date,
    contact:string,
    address:string,
    isAdminCollege:boolean,
    gender:boolean,
    exp:number,
    iat:number
    id:number
    profile_picture:string
}

export interface PublicUser{
    id:number
    name:string
    mutual_friends:number
    profile_picture:string
    is_friend:boolean,
    has_requested:boolean
    have_requested:boolean
}