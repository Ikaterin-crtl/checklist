// Categorias e itens
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
    for (const category in checklistCategories) {
        const ulElement = document.getElementById(category);
        checklistCategories[category].forEach((item, index) => {
            const itemKey = `${category}-${index}`;
            const isChecked = localStorage.getItem(itemKey) === "true";

            // Criando o item da lista
            const listItem = document.createElement("li");
            listItem.classList.add("checklist-item");
            if (isChecked) listItem.classList.add("active");

            // Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isChecked;
            checkbox.addEventListener("change", () => toggleItem(itemKey, listItem, item));

            // Label do item
            const label = document.createElement("label");
            label.textContent = item;
            if (isChecked) label.classList.add("checked");

            // Adicionar elementos ao item da lista
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            ulElement.appendChild(listItem);
        });
    }
}

// Alternar o estado de cada item no localStorage e verificar conclusão
function toggleItem(itemKey, listItem, item) {
    const isChecked = !listItem.classList.toggle("active");
    listItem.querySelector("label").classList.toggle("checked", isChecked);
    localStorage.setItem(itemKey, isChecked);

    // Checar se todos os itens estão marcados
    checkCompletion();
    
    // Atualizar a lista de itens não feitos
    updateUnfinishedItems();
}

// Função para verificar se todos os itens estão concluídos
function checkCompletion() {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
    
    // Se todos os itens estiverem marcados, exibe a mensagem e o efeito de explosão
    if (allChecked) {
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

// Função para atualizar a lista de itens não feitos
function updateUnfinishedItems() {
    const unfinishedList = document.getElementById("unfinished-list");
    unfinishedList.innerHTML = ""; // Limpar a lista antes de adicionar os itens não feitos

    for (const category in checklistCategories) {
        checklistCategories[category].forEach((item, index) => {
            const itemKey = `${category}-${index}`;
            const isChecked = localStorage.getItem(itemKey) === "true";

            // Se o item não estiver marcado como concluído, adicionar à lista de não feitos
            if (!isChecked) {
                const unfinishedItem = document.createElement("li");
                unfinishedItem.textContent = item;
                unfinishedList.appendChild(unfinishedItem);
            }
        });
    }
}

// Carregar o checklist ao abrir a página
loadChecklist();

// Atualizar a lista de itens não feitos ao carregar a página
updateUnfinishedItems();
