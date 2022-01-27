const dados = require('../dados.json')

dados.forEach(pessoa => {
    if (pessoa.demitido === true) console.log(`O funcionário ${pessoa.nome} não teve seu salário alterado pois não faz mais parte da empresa\n`)
    else {
        const saida = {
            nome: pessoa.nome,
            cargo: pessoa.cargos[0].nome,
            antigoSalario: pessoa.cargos[0].salario.split('$')[1],
        }

        let salario = pessoa.cargos[0].salario.split('$')
        salario = salario[1].split('.')
        salario = salario[0] += salario[1]
        salario = salario.split(',')
        salario = salario[0] += salario[1]
        const percentualReajuste = pessoa.cargos[0].percentual.split('%')
        salario = parseFloat(salario / 100)
        let salarioReajustado = salario + (salario * percentualReajuste[0] / 100)

        const dataAdmissao = pessoa.admissao.split('-')
        const anoAdmissao = parseInt(dataAdmissao[0])
        const mesAdmissao = parseInt(dataAdmissao[1])
        let anosReajuste = 0
        if (mesAdmissao <= 2) anosReajuste = 2022 - anoAdmissao
        else anosReajuste = 2022 - (anoAdmissao + 1)

        for (let i = 0; i < anosReajuste; i++) {
            salarioReajustado = salarioReajustado + (salarioReajustado * 0.03)
        }
        
        saida.novoSalario = salarioReajustado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        console.log(`Estes são os dados atualizados do funcionário ${saida.nome}:
Cargo: ${saida.cargo}
Antigo salário: R$ ${saida.antigoSalario}
Novo salário: ${saida.novoSalario}
`)
    }
});



