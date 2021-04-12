export interface ServiceRepositories {
    id: number
    name: string
    full_name: string
    owner: {
        login: string
        id: number
        avatar_url: string
        url: string
        html_url: string
    },
    html_url: string
    homepage: string
    description: string
    url: string
}