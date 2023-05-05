import fs from 'fs';
import chalk from 'chalk';

//Extraindo Links do arquivo .md
function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'não tem links no arquivo';
}

//Tratamento de Erro
function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Olha o erro ai vagabond'))
}

// async/await para pegar o arquivo .md
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto)
    } catch (erro){
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('Arquivo armazenado'));
    }
}

export default pegaArquivo;
