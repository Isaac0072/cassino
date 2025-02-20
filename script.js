// Objeto para armazenar as apostas
let bets = {
    numbers: {},
    color: {},
    parity: {}
};

// Função para girar a roleta e gerar um número aleatório (0 a 36)
function spinRoulette() {
    return Math.floor(Math.random() * 37);
}

// Determina a cor do número (simplificado: pares são vermelhos, ímpares são pretos, 0 é verde)
function getColor(number) {
    if (number === 0) return 'green';
    return number % 2 === 0 ? 'red' : 'black';
}

// Determina a paridade do número
function getParity(number) {
    if (number === 0) return null;
    return number % 2 === 0 ? 'even' : 'odd';
}

// Verifica as apostas e calcula os ganhos
function checkBets(winningNumber) {
    let winnings = 0;
    const color = getColor(winningNumber);
    const parity = getParity(winningNumber);

    // Apostas em números (paga 35:1)
    for (const num in bets.numbers) {
        if (parseInt(num) === winningNumber) {
            winnings += bets.numbers[num] * 35;
        }
    }

    // Apostas em cor (paga 1:1)
    if (bets.color[color]) {
        winnings += bets.color[color] * 1;
    }

    // Apostas em paridade (paga 1:1)
    if (parity && bets.parity[parity]) {
        winnings += bets.parity[parity] * 1;
    }

    // Exibe o resultado
    document.getElementById('result').textContent += ` | Ganhos: ${winnings}`;

    // Reseta as apostas
    bets = { numbers: {}, color: {}, parity: {} };
}

// Adiciona eventos de clique nas células da tabela para registrar apostas
const cells = document.querySelectorAll('#betting-table td');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const type = cell.getAttribute('data-type');
        const value = cell.getAttribute('data-value');
        if (type === 'number') {
            bets.numbers[value] = (bets.numbers[value] || 0) + 1;
        } else if (type === 'color') {
            bets.color[value] = (bets.color[value] || 0) + 1;
        } else if (type === 'parity') {
            bets.parity[value] = (bets.parity[value] || 0) + 1;
        }
        cell.style.backgroundColor = '#ffff99'; // Feedback visual
    });
});

// Adiciona evento ao botão de girar
const spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', () => {
    const winningNumber = spinRoulette();
    document.getElementById('result').textContent = `Número vencedor: ${winningNumber}`;
    checkBets(winningNumber);
});
