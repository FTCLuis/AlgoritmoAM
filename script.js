function buscar() {
	var busca = document.getElementById("busca").value.toLowerCase();
    
    // var jsonProdutos = [
	// 	{ palavraChave: "iphone", valor: 33 },
	// 	{ palavraChave: "microsoft", valor: 13 }
	// ]

	var jsonProdutos = [
		{ palavraChave: "iphone", valor: 33 },
		{ palavraChave: "apple", valor: 24 },
		{ palavraChave: "samsumg", valor: 20 },
		{ palavraChave: "google", valor: 18 },
		{ palavraChave: "microsoft", valor: 13 }
	]
    
	var index = jsonProdutos.map(e => e.palavraChave).indexOf(busca);
 
    if (index == -1) {
        alert("Palavra-chave não encontrada!");
        return;
    }

    const { valorIdeal, valorIdealComTaxa } = calcularValorIdeal(jsonProdutos, index);
    console.log("Valores Encontrados: ", { valorIdeal, valorIdealComTaxa });
   
    const classificacao = interpretarDados(busca, jsonProdutos, valorIdealComTaxa);
    alert("Classificação de busca: " + classificacao.classificacao + "\nMétrica: " + classificacao.metrica);
}


function calcularValorIdeal(vetor, posicao) {
    const n = vetor.length;
    let somaX = 0;
    let somaY = 0;
    let somaXY = 0;
    let somaXQuadrado = 0;
    let valoresNormalizados = [];
    

    for (let i = 0; i < n; i++) {
        somaX += i + 1;
        let valorNormalizado = vetor[i].valor;
        valoresNormalizados.push(valorNormalizado);
        somaY += valorNormalizado;
        somaXY += (i + 1) * valorNormalizado;
        somaXQuadrado += (i + 1) ** 2;
    }

    // Cálculo dos coeficientes 'a' e 'b' da reta usando o método dos mínimos quadrados
    const a = (n * somaXY - somaX * somaY) / (n * somaXQuadrado - somaX ** 2);
    const b = (somaY - a * somaX) / n;

    // Valor ideal baseado na posição desejada
    const valorIdeal = a * (1) + b;
    const valorIdealComTaxa = valorIdeal * (1 + 0.05);
    
    return {valorIdeal, valorIdealComTaxa };
}

function interpretarDados(palavraBusca, vetor, valorIdeal) {
    let valorBusca = 0;
    let produtoSelecionado = vetor[vetor.map(e=>e.palavraChave).indexOf(palavraBusca)]
    let valorMaximo = vetor.reduce((max, item) => Math.max(max, item.valor), 0)
    
    //valorBusca
    valorBusca = produtoSelecionado.valor / valorMaximo;

    // Folksonomia
    valorBusca *= (valorMaximo / valorIdeal);

    // Métrica de 0 a 1    
    valorBusca = Math.min(1, Math.max(0, valorBusca));

    // Comparar o valor buscado com os limites para determinar a classificação
    if (valorBusca >= 0.9) {
        return {metrica: valorBusca, classificacao:"Excelente"};
    } else if (valorBusca >= 0.7) {
        return {metrica: valorBusca, classificacao:"Bom"};
    } else if (valorBusca >= 0.5) {
        return {metrica: valorBusca, classificacao:"Regular"};
    } else {
        return {metrica: valorBusca, classificacao:"Ruim"};
    }
}