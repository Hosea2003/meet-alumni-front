export interface Tokens{
    refresh:string,
    access:string
}

export interface RefreshTokens{
    exp:number
}

export interface AccessTokens{
    exp:number
    user_id:number
}
