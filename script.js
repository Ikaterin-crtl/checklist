// Definição das categorias e itens
const checklistCategories = {
    "exames-e-fotos": [
        "ASO Admissional",
        "Foto 3x4 recente"
    ],
    "documentacao-profissional": [
        "Carteira Profissional (física ou PDF para CTPS digital)",
        "Número da carteira (foto)",
        "Anotações Gerais",
        "Página da Contribuição Sindical",
        "Baixa do último emprego",
        "Registros anteriores",
        "Qualificação civil (verso da foto)"
    ],
    "documentos-pessoais": [
        "2 cópias da Carteira de Identidade (RG)",
        "1 cópia do CPF",
        "1 cópia do Cartão Nacional de Saúde (SUS)",
        "1 cópia da Carteira de Habilitação (se aplicável)",
        "1 cópia do Certificado de Reservista (se aplicável)",
        "1 cópia do Comprovante do PIS",
        "1 cópia do Título de Eleitor",
        "Certidão de Nascimento/Casamento ou Declaração Pública de união estável"
    ],
    "comprovantes-de-residencia": [
        "Comprovante de Residência recente no nome do candidato (conta de Luz, Telefone, Água ou Contrato de Aluguel)"
    ],
    "documentos-dos-dependentes": [
        "Cartão SUS dos filhos",
        "Carteira de Vacinação dos filhos até 5 anos",
        "CPF dos filhos",
        "Certidão de Nascimento dos filhos ou RG",
        "Cartão SUS do cônjuge/companheiro",
        "RG e CPF do cônjuge/companheiro"
    ],
    "escolaridade-e-cursos": [
        "Comprovante de Escolaridade",
        "Comprovante de Cursos Extra-Curriculares"
    ],
    "dados-bancarios": [
        "Comprovante de conta corrente Banco Bradesco"
    ],
    "vacina": [
        "Comprovante de vacinação Covid-19 (1ª e 2ª dose)"
    ]
};

// Função para carregar o checklist com categorias
function loadChecklist() {
    // Atualizar a lista de itens não concluídos
    updateUnfinishedList();

    for (const category in checklistCategories) {
        const ulElement = document.getElementById(category);
        checklistCategories[category].forEach((item, index) => {
            const itemKey = `${category}-${index}`;

            // Criando o item da lista
            const listItem = document.createElement("li");
            listItem.classList.add("checklist-item");

            // Checkbox (invisível)
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = itemKey;

            // Verificar se o item já foi marcado
            const isChecked = localStorage.getItem(itemKey) === "true";
            checkbox.checked = isChecked;
            if (isChecked) {
                listItem.classList.add("checked");
            }

            // Adicionar evento de clique
            checkbox.addEventListener("change", () => toggleItem(itemKey, listItem, item));

            // Label do item
            const label = document.createElement("label");
            label.textContent = item;

            // Adicionar checkbox e label no item
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            ulElement.appendChild(listItem);
        });
    }
}

// Função para alternar o estado de cada item
function toggleItem(itemKey, listItem, item) {
    const isChecked = !listItem.classList.toggle("checked");
    localStorage.setItem(itemKey, isChecked);

    // Se item for marcado, faz o efeito de ampliar e remove
    if (isChecked) {
        listItem.classList.add("expanded");
        setTimeout(() => {
            listItem.style.display = "none";
            updateUnfinishedList();
            checkCompletion();
        }, 300); // Tempo do efeito de ampliação
    } else {
        listItem.classList.remove("expanded");
        updateUnfinishedList();
    }
}

// Função para verificar se todos os itens estão marcados
function checkCompletion() {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);

    // Se todos os itens estiverem marcados, esconde a seção "O que falta?"
    if (allChecked) {
        document.getElementById("unfinished-section").style.display = "none";
        const message = document.getElementById("completion-message");
        const explosion = document.getElementById("completion-explosion");

        message.style.display = "block";
        explosion.style.display = "block";

        // Ocultar após a animação
        setTimeout(() => {
            explosion.style.display = "none";
        }, 1000);
    }
}

// Função para atualizar a lista de itens não concluídos
function updateUnfinishedList() {
    const unfinishedList = document.getElementById("unfinished-list");
    unfinishedList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens

    // Iterar por todas as categorias e verificar os itens não concluídos
    for (const category in checklistCategories) {
        checklistCategories[category].forEach((item, index) => {
            const itemKey = `${category}-${index}`;
            const isChecked = localStorage.getItem(itemKey) === "true";

            // Adicionar apenas os itens não marcados na lista de "O que falta"
            if (!isChecked) {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                unfinishedList.appendChild(listItem);
            }
        });
    }
}

// Carregar o checklist ao abrir a página
loadChecklist();
