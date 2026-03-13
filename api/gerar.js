export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { prompt } = req.body;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        
        res.status(200).json(data);

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ error: 'Erro ao gerar CSS' });
    }
}