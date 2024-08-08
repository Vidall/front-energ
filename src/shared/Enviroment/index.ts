export const Environment = {
  /**
   * Define a quantidade padrão de linhas a ser carregada nas listagens
  */
  LIMITE_DE_LINHAS: 5,

  /**
    * Placeholder dos campos de pesquisa

   * Retorno padrão quando não houver retorno na listagem
   */
  LISTAGEM_VAZIA: 'Nenhum registro encontrado',

  /**
   * URL base de onde está a API do backend
   */
  URL_BASE_API_TS: 'http://localhost:3001',
  // URL_BASE_API_TS: 'http://ec2-3-18-16-165.us-east-2.compute.amazonaws.com/apiTS',
  URL_BASE_API_OS: 'http://localhost:8080',
  URL_BASE_API_EMAIL: 'http://localhost:8081',
  URL_BASE_FRONT: 'http://localhost:3000',

  CAMINHO_INICIO: '/incio',
  CAMINHO_PESSOA_FISICA: '/clientes/pessoaFisica',
  CAMINHO_PESSOA_JURIDICA: '/clientes/pessoaJuridica',
  CAMINHO_TECNICOS: '/tecnicos',
  CAMINHO_EQUIPAMENTOS: '/equipamentos',
  CAMINHO_EQUIPAMENTOS_DETALHE: '/equipamentos/detalhe',

  CAMINHO_GRUPOS_SERVICOS: '/api/grupos_servicos',
  CAMINHO_SERVICOS: '/api/servicos'

  // /**
  //  * Caminhos da url para realizar operações com pessoas fisicas
  //  */
  // CAMINHO_PESSOA_FISICA:'/clientes/pessoaFisica',

  // /**
  //  * Caminhos da url para realizar operações com pessoas juridicas
  //  */
  // CAMINHO_PESSOA_JURIDICA:'/clientes/pessoaJuridica',

  // /**
  //  * Caminhos da url para realizar operações com pessoas juridicas
  //  */
  // CAMINHO_TECNICO:'/tecnico',

  // /**
  //  * Caminhos da url para logar na aplicação
  //  */
  // CAMINHO_ENTRAR:'/signin'

};