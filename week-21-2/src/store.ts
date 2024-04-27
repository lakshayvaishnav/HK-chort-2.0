interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  private games: Game[] = [];

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  public addMove(gameId: string, move: string) {
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }

  public logState() {
    console.log(this.games);
  }
}

export const Games = new GameManager();
