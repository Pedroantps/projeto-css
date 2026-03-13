const btnGerar = document.getElementById("btnGerar");
const btnCopiar = document.getElementById("btnCopiar");
const textoCodigo = document.getElementById("textoCodigo");
const box = document.getElementById("box");

async function gerarCSS() {
    const prompt = document.querySelector("textarea").value;
    textoCodigo.textContent = "Gerando CSS...";
    btnCopiar.classList.add("oculto");

    try {
        const response = await fetch("/api/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt })
            });

        if (!response.ok) {
                throw new Error(`Erro na API da Groq: Status ${response.status}`);
            }

        let data = await response.json();
        
        let respostaIA = data.choices[0].message.content;
        
        respostaIA = respostaIA.replace(/```html/g, "").replace(/```css/g, "").replace(/```/g, "").trim();

        if (respostaIA === "" || respostaIA.toLowerCase().includes("não foi possível gerar o código, digite algo que seja coerente.")) {
            box.srcdoc = "";
            textoCodigo.textContent = respostaIA;
            return;
        }

        box.srcdoc = respostaIA;

        const cssMatch = respostaIA.match(/<style>([\s\S]*?)<\/style>/i);

        if (cssMatch && cssMatch[1]) {
            textoCodigo.textContent = cssMatch[1].trim();
        } else {
            textoCodigo.textContent = respostaIA;
        }

    } catch (erro) {
        console.error("Erro capturado:", erro);
        textoCodigo.textContent = "Ops! Ocorreu um erro ao gerar o CSS.";
        box.srcdoc = "";
    }

    btnCopiar.classList.remove("oculto");
}

function copiarTexto() {
    const textoParaCopiar = textoCodigo.innerText;

        navigator.clipboard.writeText(textoParaCopiar)
            .then(() => {
                alert("Código copiado com sucesso!");
            })
            .catch((erro) => {
                console.error("Erro ao copiar texto:", erro);
            });
}


btnGerar.addEventListener("click", 
    () => {
        if (!document.querySelector("textarea").value.trim()) {
            alert("Por favor, digite o que deseja criar.");
            return;
        }
        gerarCSS() 
    }
);

btnCopiar.addEventListener("click", copiarTexto);