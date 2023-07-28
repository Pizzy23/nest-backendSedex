# Correio

Nossa API tem como objetivo principal localizar um CEP próximo a uma determinada localidade e também fornecer a geração de CPFs válidos, seguindo as mesmas regras utilizadas pelo correio. Para alcançar esse propósito, integramos o conceito de Plus Code, utilizando uma API disponibilizada pelo correio para a localização e criação dos CEPs.
O Plus Code é uma forma inovadora de representar localizações no mapa, que utiliza combinações alfanuméricas para codificar coordenadas geográficas precisas. Com essa abordagem, podemos localizar CEPs com maior precisão e rapidez, o que é especialmente útil quando se deseja encontrar endereços próximos a um ponto específico.
Além disso, oferecemos a funcionalidade de gerar CPFs válidos, respeitando as regras estabelecidas pelo correio para garantir a autenticidade e correção dos dados gerados. Essa funcionalidade é útil em diversos cenários, como testes de sistemas, simulações e outras aplicações que requerem a criação de CPFs válidos para fins legítimos.
Ao combinar a localização de CEPs por meio do Plus Code com a geração de CPFs válidos, nossa API se torna uma ferramenta versátil e eficiente para atender às necessidades de diversos clientes e aplicações. Estamos comprometidos em oferecer uma solução confiável e de alta qualidade, garantindo a precisão dos dados e a conformidade com as normas estabelecidas pelo correio.

### Como instalar a parte do Back

Certifique-se de ter o Node.js instalado em sua máquina.

Instalar o projeto.

```
npm install
```

Iniciar o projeto:

```
nest start
localhost:3000/api
```

Teste na AWS:

```

```

# Casos de uso

1. Localização de rua próxima a partir do CEP:

- O usuário envia uma solicitação para a API com um CEP de referência.
- O controller responsável pela localização da rua próxima ao CEP recebe a requisição.
- A API utiliza o serviço de correios-brasil para consultar o endereço associado ao CEP fornecido pelo usuário.
- Caso o endereço seja encontrado, a API utiliza o serviço de geocodificação (GeoCodeService) para obter as coordenadas geográficas (latitude e longitude) do endereço.
- Em seguida, a API gera um novo CEP para a rua próxima utilizando regras específicas, como a concatenação dos primeiros dígitos do CEP original com um número aleatório.
- O controller retorna ao usuário as informações da rua próxima, incluindo o novo CEP, o Plus Code associado às coordenadas e as próprias coordenadas geográficas.

2. Rota para obter o Plus Code do usuário:

- O usuário faz uma solicitação para a API através da rota correspondente.
- O controller responsável pelo Plus Code recebe a requisição.
- A API utiliza o serviço de geocodificação (GeoCodeService) para obter as coordenadas geográficas (latitude e longitude) do usuário, que pode ser fornecida pelo frontend ou obtida de outra forma.
- O controller retorna ao usuário o Plus Code associado às coordenadas fornecidas.

3. Rota para obter as coordenadas do usuário:

- O usuário faz uma solicitação para a API através da rota correspondente.
- O controller responsável pelas coordenadas recebe a requisição.
- A API recebe as coordenadas geográficas (latitude e longitude) do usuário, fornecidas pelo frontend ou por outra fonte.
- O controller retorna ao usuário as coordenadas geográficas recebidas.

Esses casos de uso refletem como a API funciona para fornecer informações de localização e CEPs com base em diferentes inputs do usuário. Ela oferece a possibilidade de localizar a rua próxima a partir de um CEP, obter o Plus Code do usuário e também receber e retornar coordenadas geográficas. Isso proporciona uma experiência completa e flexível para os usuários que desejam acessar informações de localização precisas e atualizadas em suas aplicações e sistemas.

# Design Patterns (Backend)

- Decorators
- Singleton
- Factory

# External Packages (Backend)

- NestJs
- Jest

# Arquitetura usada (Backend)

- Hexagonal Architecture
- Modular

## Futuro

No futuro, estamos planejando expandir ainda mais as funcionalidades da nossa API para incluir uma inteligência artificial avançada capaz de localizar ruas mesmo quando o CEP não está disponível. Essa IA utilizará dados de geolocalização e outras fontes de informação para identificar e mapear novas ruas, permitindo que elas sejam facilmente acessíveis em nosso sistema.
Com a implementação dessa IA, a nossa API se tornará ainda mais poderosa e versátil, sendo capaz de gerar CEPs para essas novas ruas com base em critérios precisos e confiáveis. Dessa forma, poderemos oferecer uma experiência mais completa e abrangente para nossos usuários, ajudando-os a localizar endereços mesmo em áreas que ainda não possuem CEP oficial.
Essa melhoria representa um avanço significativo na nossa missão de fornecer soluções inovadoras e práticas para localização e gerenciamento de endereços. Estamos comprometidos em continuar aprimorando nossa API e explorando novas tecnologias para atender às necessidades em constante evolução dos nossos usuários.
Com a adição dessa funcionalidade de IA, nossa API estará preparada para lidar com uma ampla gama de cenários, desde a localização de endereços já conhecidos até a identificação de novas ruas e a geração de CEPs correspondentes. Isso tornará a nossa API uma ferramenta valiosa para empresas, desenvolvedores e todos aqueles que dependem de informações precisas de localização em suas aplicações e sistemas.

## Testes

Nossa API é robusta e inclui testes unitários para garantir sua confiabilidade e desempenho. Os testes unitários são uma parte essencial do nosso processo de desenvolvimento, pois nos permitem verificar individualmente cada componente da aplicação. Isso nos ajuda a identificar e corrigir problemas em um estágio inicial, garantindo que nossa API funcione conforme o esperado em diferentes cenários.
