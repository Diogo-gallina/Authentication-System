**Requisitos Funcionais:**

- [ ] O sistema deve permitir que os usuários se cadastrem fornecendo nome, e-mail e uma senha.
- [ ] O sistema deve permitir que os usuários visualizem seu perfil, incluindo informações pessoais.
- [ ] O sistema deve permitir que os usuários excluam sua conta.
- [ ] O sistema deve permitir que os usuários atualizem sua senha. **// Diferencial**
- [ ] O sistema deve mandar um e-mail, ao usuário validando o cadastro
- [ ] O sistema deve permitir que os usuários façam login utilizando seu e-mail e senha cadastrados.
- O sistema deve permitir que os usuários façam login, gerando um token de autenticação e um refresh token;
- [ ] O sistema deve permitir que os usuários autenticados permaneçam on-line sem precisar deslogar
- [ ] O sistema deve permitir que o usuário faça login apenas com autenticação de dois fatores via sms ou e-mail.

**Regras de Negócio:**

// Na autenticação, só é necessário um erro.

- [ ] Cada usuário deve ter um endereço de e-mail único para se cadastrar no sistema.
- [ ] As senhas dos usuários devem ser armazenadas de forma segura, utilizando técnicas de criptografia.
- [ ] As senhas devem estar num padrão alfanumérico, min: 8 max: 32.
- [ ]  Deve ser validada a existência do e-mail do usuário.
- [ ] Ao cadastrar o e-mail, deve validar a formatação do email “example@.com”.
- [###] Os usuários autenticados devem ter permissão para acessar e atualizar apenas seu próprio perfil.
- [ ] A autenticação de dois fatores deve ser via sms ou e-mail.
- [ ] O sistema deve projeteger rotas específicas, por exemplo: acesso apenas para usuários autenticados.
- [ ] A cada 5 min, deve ser expirado o token do usuário.
- [ ] Ápos a expiração, deve ser gerado um novo token “refresh-token”
- [ ] O refresh token deve ser utilizado para renovar o token de autenticação quando este expirar;
- [ ] O sistema deve verificar a validade dos tokens e garantir a segurança das informações;
- [ ] A rota de login gerará um token

**Requisitos Não Funcionais:**

- [ ] O sistema deve ser desenvolvido utilizando o framework Nest.js e a linguagem de programação TypeScript.
- [ ] O sistema deve ser implementado seguindo os princípios da arquitetura RESTful.
- [ ] O sistema deve ser seguro, protegendo as informações pessoais dos usuários.
- [ ] O sistema deve ser testável, facilitando a escrita e execução de testes automatizados para garantir a qualidade do código.
- [ ] O sistema deve ter uma documentação clara e abrangente utilizando Swagger, incluindo instruções de instalação, configuração e uso das APIs disponíveis.
- [ ] O sistema deve ser integrado com serviços de terceiros para autenticação de e-mails, armazenamento de arquivos, etc., quando necessário.
- [ ] O sistema deve persistir os dados do usuário utilizando PostgreSQL