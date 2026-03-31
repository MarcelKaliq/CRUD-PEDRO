const ordemMontagem = ['mobo', 'cpu', 'ram', 'storage', 'psu', 'gpu'];
let etapaAtual = 0; 
let setupSalvo = []; 
const dadosPecas = {
    'mobo': { 
        nome: "Placa-Mãe",
        img: "pc01mc.png", 
        dica: "Cuidado com o tamanho (ATX, Micro-ATX)!",
        modelo: "ASUS Prime B550M" },
    'cpu': { 
        nome: "Processador", 
        img: "pc02mc.png", 
        dica: "Alinhe a seta dourada com a da placa.", 
        modelo: "AMD Ryzen 5 5600X" },
    'ram': { 
        nome: "Memória RAM", 
        img: "pc03mc.png",
        dica: "Encaixe até ouvir o 'click'.",
        modelo: "Kingston Fury 16GB" },
    'storage': { 
        nome: "SSD NVMe",
        img: "pc04mc.png", 
        dica: "Remova o parafuso do slot M.2 antes.", 
        modelo: "Samsung 980 Pro 1TB" },
    'psu': { 
        nome: "Fonte", 
        img: "pc05mmc.png", 
        dica: "Ventoinha para baixo para pegar ar frio.", 
        modelo: "Corsair RM750x" },

    'gpu': { nome: "Placa de Vídeo",
         img: "pc06mc.png",
          dica: "Conecte os cabos PCIe da fonte.",
           modelo: "RTX 4060 Ti" }
};

function showInfo(idPeca) {
    if (idPeca !== ordemMontagem[etapaAtual]) {
        alert(`Erro de montagem! Instale primeiro: ${dadosPecas[ordemMontagem[etapaAtual]].nome}`);
        return;
    }

    const info = dadosPecas[idPeca];
    const card = document.getElementById(`card-${idPeca}`);
    const input = document.getElementById(`input-${idPeca}`);
    const dicaTxt = document.getElementById(`dica-${idPeca}`);

    if(dicaTxt) dicaTxt.innerText = info.dica;
    if(input) input.placeholder = info.modelo;

    card.classList.remove('hidden');
}


function instalarPeca(idPeca) {
    const input = document.getElementById(`input-${idPeca}`);
    const statusTxt = document.getElementById(`status-${idPeca}`);
    const display = document.getElementById('pc-display');
    const btnEdit = document.getElementById(`btn-edit-${idPeca}`);

    if (input.value.trim() === "") {
        alert("Digite o modelo da peça para continuar!");
        return;
    }

    
    const novaPeca = {
        id: idPeca,
        categoria: dadosPecas[idPeca].nome,
        modeloInformado: input.value.toUpperCase()
    };
    setupSalvo.push(novaPeca); 

    display.src = `./assets/${dadosPecas[idPeca].img}`;
    statusTxt.innerText = `OK: ${input.value.toUpperCase()}`;

    input.classList.add('hidden'); 
    btnEdit.classList.remove('hidden'); 

    if(event && event.target) event.target.classList.add('hidden');
    
    etapaAtual++;

    if (etapaAtual === ordemMontagem.length) {
        document.getElementById('btn-reset').classList.remove('hidden');
        document.getElementById('btn-ligar').classList.remove('hidden');
        alert("Setup Montado! Preparado para Ligar?");
    }
}


function ligarPC() {
    const display = document.getElementById('pc-display');
    display.src = "./assets/pcledmc.png";

    const btnLigar = document.getElementById('btn-ligar');
    btnLigar.innerText = "SYSTEM ONLINE";
    btnLigar.classList.add('active');
    
    const relatorio = document.getElementById('relatorio-final');
    const lista = document.getElementById('lista-pecas');
    
    if(relatorio && lista) {
        lista.innerHTML = ""; 
        setupSalvo.forEach(peca => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${peca.categoria}:</strong> ${peca.modeloInformado}`;
            lista.appendChild(item);
        });
        relatorio.classList.remove('hidden');
    }

    console.table(setupSalvo);
}


function editarPeca(idPeca) {
    const input = document.getElementById(`input-${idPeca}`);
    const btnOk = document.querySelector(`#card-${idPeca} .ok-btn`);
    const statusTxt = document.getElementById(`status-${idPeca}`);
    const btnEdit = document.getElementById(`btn-edit-${idPeca}`);

    input.classList.remove('hidden');
    btnOk.classList.remove('hidden');
    statusTxt.innerText = "";
    btnEdit.classList.add('hidden');


    setupSalvo = setupSalvo.filter(p => p.id !== idPeca);

    etapaAtual = ordemMontagem.indexOf(idPeca);
    
    console.log("Editando... Voltamos para a etapa:", etapaAtual);
}

function resetarTudo() {
    setupSalvo = []; 
    window.location.reload(); 
}