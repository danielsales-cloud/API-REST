# API de Produtos (Filmes)

**Aluno:** Daniel de Sales Bernardino  
**Matrícula:** 251041089  

API em Node.js + Express para gerenciar produtos (filmes como exemplo).  

---

## Endpoints

- **GET /api/produtos** → lista todos os produtos, com filtros, ordenação e paginação  
- **GET /api/produtos/:id** → busca produto por ID  
- **POST /api/produtos** → cria novo produto  
  - Body JSON: `{ "nome": "Nome do Filme", "nota": 9, "categoria": "Categoria" }`  
  - Validações: campos obrigatórios, nota 0-10, nome ≥ 3 caracteres  

---

## Exemplos de produtos criados

- Um Sonho de Liberdade (Drama, 10)  
- Forrest Gump (Drama, 10)  
- Interestelar (Ficção Científica, 9)  
- O Rei Leão (Animação, 10)  
- Gladiador (Ação, 9)  

---

## Testes realizados

- GET todos  
- GET por ID  
- POST sucesso  
- POST erro (validação)  
- Filtros, ordenação e paginação  
