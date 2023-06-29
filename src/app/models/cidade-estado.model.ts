export class CidadeEstado {
  public id!: number;
  public sigla!: string;
  public nome!: string;
  public regiao!: {
    id: number;
    sigla: string;
    nome: string;
  }
}
