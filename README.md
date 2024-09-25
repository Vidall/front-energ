# Web Service de Controle e Agendamento de Serviços

## Contexto do Projeto

Este projeto foi desenvolvido para um cliente que precisava de uma solução completa para gerenciar o controle e agendamento de serviços de sua empresa. A solução envolve duas APIs robustas e uma interface gráfica intuitiva para gerenciar desde clientes até ordens de serviço, técnicos e os serviços executados.

## Front-end

### Tecnologias Utilizadas:
- *React* com *TypeScript*: para a construção de uma interface dinâmica e escalável.
- *Material UI*: para garantir um design moderno e responsivo.
- *Axios*: para consumo de APIs de forma eficiente.
- *ESLint*: para manter o código padronizado e livre de erros.

### Funcionalidade Principal:
- Interface amigável que permite ao usuário final gerenciar ordens de serviço, visualizar informações de clientes e técnicos, e acompanhar o progresso dos serviços.
- *Geração de Relatórios*: O relatório final é montado diretamente no front-end, consumindo todas as informações necessárias dos dois back-ends (Node.js e Spring Boot). O relatório é renderizado de forma leve e eficiente em HTML, e o usuário pode baixá-lo diretamente.

## API 1: CRUD de Clientes e Técnicos (Node.js & TypeScript)

### Tecnologias Utilizadas:
- *Node.js com Express*: para construir uma API performática e leve.
- *MySQL*: para armazenamento de dados relacionados aos clientes e técnicos.
- *YUP*: utilizado para validação dos dados recebidos, garantindo a integridade das informações.
- *S3 da Amazon*: para armazenamento de assinaturas dos técnicos.

### Responsabilidades:
- Gerenciamento completo de clientes físicos, jurídicos e técnicos.
- Armazenamento seguro das assinaturas dos técnicos através do serviço da *Amazon S3*.

## API 2: Gestão de Ordens de Serviço (Java Spring Boot)

### Tecnologias Utilizadas:
- *Spring Boot MVC*: para a construção de uma API robusta e escalável.
- *Flyway*: para versionamento e migração do banco de dados.
- *Spring JPA*: para manipulação dos dados de forma simples e eficiente.
- *ModelMapper*: para facilitar a conversão de dados entre as camadas da aplicação.
- *Thumbnailator*: para manipulação e geração de miniaturas das imagens relacionadas aos serviços.
- *Amazon S3*: para armazenamento de fotos de antes e depois dos serviços realizados.
- *Spring Doc*: documentação automatizada da API.

### Funcionalidades:
- Gerenciamento de ordens de serviço e serviços prestados.
- Armazenamento de fotos dos serviços no *S3* da Amazon, como parte da documentação visual dos serviços realizados.

## Integração de Funcionalidades

O sistema permite o agendamento de serviços e, ao final de cada serviço, é gerado um relatório detalhado diretamente no front-end. Este relatório combina as informações dos dois back-ends:

- *API de Clientes e Técnicos*: fornece dados sobre o cliente, o técnico e suas assinaturas armazenadas no S3.
- *API de Ordens de Serviço*: fornece dados sobre os serviços realizados, incluindo fotos de antes e depois.

O relatório é renderizado em *HTML*, podendo ser baixado diretamente pela interface do usuário.

## Deploy

- O deploy do projeto foi realizado em uma *VPS da Hostinger*, garantindo alta disponibilidade e performance.
- Utilizou-se o *Docker Compose* para orquestrar os serviços, incluindo:
  - As duas APIs (Node.js e Spring Boot).
  - O banco de dados MySQL.
  - O front-end React.

O uso do Docker Compose permitiu uma configuração eficiente e modular dos containers, facilitando o processo de deploy e escalabilidade da aplicação.

## Conclusão

O sistema integra eficientemente a gestão de clientes e técnicos com a execução e documentação dos serviços realizados. A geração do relatório no front-end, consumindo múltiplas fontes de dados, garante leveza e rapidez na disponibilização do documento final para download. Com o deploy realizado na *VPS da Hostinger* utilizando *Docker Compose*, o projeto se beneficia de uma infraestrutura robusta e escalável, além de um ambiente bem organizado para desenvolvimento e produção.
