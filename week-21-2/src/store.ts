interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  private static instance: GameManager;
  private games: Game[] = [];
  private constructor() {
    this.games = [];
  }

  static getInstance() {
    // create a stance of the gameManager class .
    if (GameManager.instance) {
      return GameManager.instance;
    } else {
      GameManager.instance = new GameManager();
      return GameManager.instance;
    }
  }

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

// constructor of this calss is private so you can;t create a new instance...

export const gameManager = GameManager.getInstance();
