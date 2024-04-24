function buscar() {
    var busca = document.getElementById("busca").value.toLowerCase();
    var palavrasChave = ["iphone33", "apple12", "samsung20", "google15", "microsoft10"];
    var valores = [33, 12, 20, 15, 10]; // Quantidade de vezes que as palavras-chave foram compartilhadas

    var index = palavrasChave.indexOf(busca);
    if (index !== -1) {
        var media = valores.reduce((acc, cur) => acc + cur, 0) / valores.length;
        var [m, c] = calcularEquacaoReta(valores);
        var ideal = calcularValorIdeal(m, c, index + 1);

        var valor = calcularValor(valores[index], ideal);

        var nivel;
        if (valor < 0.3) {
            nivel = "Baixo";
        } else if (valor < 0.7) {
            nivel = "Médio";
        } else {
            nivel = "Alto";
        }

        alert("O nível do metadado é: " + nivel);
    } else {
        alert("Palavra-chave não encontrada!");
    }
}

function calcularEquacaoReta(valores) {
    var n = valores.length;
    var sumX = 0;
    var sumY = valores.reduce((acc, cur) => acc + cur, 0);
    var sumXY = 0;
    var sumXSquare = 0;

    for (var i = 0; i < n; i++) {
        sumX += i + 1;
        sumXY += (i + 1) * valores[i];
        sumXSquare += Math.pow(i + 1, 2);
    }

    var m = (n * sumXY - sumX * sumY) / (n * sumXSquare - Math.pow(sumX, 2));
    var c = (sumY - m * sumX) / n;

    return [m, c];
}

function calcularValorIdeal(m, c, x) {
    return m * x + c;
}

function calcularValor(valor, ideal) {
    return valor / ideal;
}
