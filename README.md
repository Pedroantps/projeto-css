# ⚡ CSS Generator com IA

Uma ferramenta web prática que utiliza Inteligência Artificial para criar componentes com códigos HTML e CSS personalizados a partir de descrições em texto. Desenvolvida para facilitar o processo de design web e poupar tempo a programadores e designers.

## ✨ Funcionalidades

- **Geração Inteligente:** Transforma pedidos em texto (ex: "botão azul que pisca") em código limpo.
- **Visualização em Tempo Real:** Um *iframe* integrado que renderiza instantaneamente o componente gerado pela IA.
- **Cópia Rápida:** Botão de um clique com *Clipboard API* para copiar o código CSS gerado.
- **Arquitetura Segura:** Utiliza *Serverless Functions* para ocultar a chave da API, evitando fugas e roubos de cota.

## 🚀 Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript (Vanilla)
- **Back-end / Alojamento:** Vercel Serverless Functions (pasta `/api`)
- **Inteligência Artificial:** API da Groq (Modelo `llama-3.3-70b-versatile`)

## 🔗 Demonstração ao Vivo

Pode testar o projeto a funcionar diretamente através do link da Vercel:
[CSS Generator com IA](https://projeto-css-sigma.vercel.app/)

## 🛠️ Como correr o projeto localmente

Como o projeto utiliza uma função *serverless* (Back-end) para proteger a chave da API, para o testar localmente no seu computador, é necessário simular o ambiente da Vercel.

1. **Faça o clone do repositório:**
   ```bash
   git clone [https://github.com/Pedroantps/projeto-css.git](https://github.com/Pedroantps/projeto-css.git)