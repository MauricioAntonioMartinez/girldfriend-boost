

export interface GenerateAccessTokenParams {
    email: string;
    password: string;
}

export interface GenerateTokenParams {
    facebookEmailAddress: string;
    facebookPassword: string;
}


export interface RefreshCredentialsParams {
    apiToken:string 
    refreshToken: string 

}