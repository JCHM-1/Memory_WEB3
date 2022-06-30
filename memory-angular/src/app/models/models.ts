export interface gameData {
  aantSpelers: number;
  aantSpellen: number;
  apis: {
    api: string,
    aantal: number
  }
}

export interface playerData{
  players: {
    username: string;
    email: string;
  }
}
