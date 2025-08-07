# Arquitetura do projeto
## Aplicação monolítica:
A arquitetura adotada pelo projeto se baseia no modelo monolítico, pois todas as funcionalidades presentes na aplicação são desenvolvidas e implementadas como uma única unidade, o código da interface do usuário (frontend), a lógica de negócios e o acesso a dados (backend) estão todos em uma mesma base de código. Em outras palavras o código para gerenciar animais, usuários, a lógica para renderizar as páginas HTML e as configurações do servidor estão todos contidos no mesmo projeto. Não existem programas ou serviços externos dos quais ele dependa para funcionar. Quando a aplicação está no ar, existe um único processo principal do sistema respondendo por tudo. Não importa se o usuário está na página de login ou na galeria de animais, o mesmo "programa" está trabalhando para atender sua solicitação.

## Padrão MVT (Ramificação do padrão MVC):
O sistema também adota o padrão MVT. Porque foi construído com o framework Django, que organiza o código interno seguindo a lógica de Model (dados em `models.py`), View (lógica de requisição em `views.py`) e Template (apresentação em arquivos HTML na pasta `templates/`).
Ele divide as responsabilidades do código em três papéis claros:

### M - Model:
  Define a estrutura dos dados e como eles são armazenados. É a única parte do sistema que deve falar diretamente com o banco de dados. No Projeto, isso é representado pelos arquivos `animal/views.py`. Dentro de `animal/views.py`, você encontrará uma classe como Animal, que define os campos que um animal possui (nome, idade, raça, foto, etc.). O Django usa essa definição para criar automaticamente a tabela animal no banco de dados.

### V - View (equivale ao Controller):
  Atua como o intermediário principal. Ela recebe uma solicitação do usuário, decide o que fazer com ela, busca ou salva informações usando os Models e, por fim, seleciona qual Template usar para responder ao usuário. É aqui que mora a lógica de negócio. No Projeto, são os arquivos `views.py`. Por exemplo, em `animal/views.py` pode existir uma função `detalhe_animal(request, animal_id)`. Essa função recebe o ID de um animal, usa o Model Animal para buscar esse animal específico no banco de dados e, em seguida, manda essa informação para um template de detalhes.

### T - Template (equivale à View):
  É a camada de apresentação. Consiste em arquivos HTML com marcações especiais que permitem exibir os dados fornecidos pela View. É responsável pela aparência da aplicação. No Projeto, equivale ao diretório `templates/`. Haveria um arquivo como `templates/animal/detalhe.html`. Este arquivo HTML conteria placeholders como {{ animal.nome }} e {{ animal.idade }}. Quando a View renderiza este template, ela substitui esses placeholders pelos dados reais do animal que ela buscou no banco.

# Diagrama de componentes:
<img width="562" height="425" alt="image" src="https://github.com/user-attachments/assets/2719d8f7-16bd-4b0e-ac14-0aaaf805f552" />
