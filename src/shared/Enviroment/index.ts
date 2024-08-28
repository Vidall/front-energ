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
  URL_BASE_API_TS: process.env.REACT_APP_URL_BASE_API_TS, 
  URL_BASE_API_OS: process.env.REACT_APP_URL_BASE_API_OS,
  URL_BASE_FRONT: process.env.REACT_APP_URL_BASE_FRONT,

  CAMINHO_INICIO: '/inicio',
  CAMINHO_PESSOA_FISICA: '/clientes/pessoaFisica',
  CAMINHO_PESSOA_JURIDICA: '/clientes/pessoaJuridica',
  CAMINHO_TECNICOS: '/tecnicos',
  CAMINHO_EQUIPAMENTOS: '/equipamentos',
  CAMINHO_EQUIPAMENTOS_DETALHE: '/equipamentos/detalhe',

  CAMINHO_GRUPOS_SERVICOS: '/api/grupos_servicos',
  CAMINHO_SERVICOS: '/api/servicos',
  CAMINHO_ORDEM: '/api/ordem',
  CAMINHO_SERVICO_IN_ORDER: '/api/servico_ordem'

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