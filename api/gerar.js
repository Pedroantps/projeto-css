export default async function handler(req, res) {
    // 1. Só aceita requisições do tipo POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // 2. Pega o texto que o seu front-end enviou
    const { prompt } = req.body;

    try {
        // 3. Faz a requisição para a Groq (Escondido no servidor!)
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Aqui ele lê o seu arquivo "privado" (.env)
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}` 
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate. Quando não fizer sentido, retorne 'Não foi possível gerar o código, digite algo que seja coerente.'." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 800
            })
        });

        const data = await response.json();
        
        // 4. Devolve a resposta pronta para o seu Front-end
        res.status(200).json(data);

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ error: 'Erro ao gerar CSS' });
    }
}