export interface SimpleBoardInfo {
    boardMasters: string[]
    description: string
    id: number
    name: string
    postCount: number
    todayCount: number
    topicCount: number
}

export interface BoardListInfo {
    boards: SimpleBoardInfo[]
    id: number
    masters: string[]
    name: string
    order: number
}