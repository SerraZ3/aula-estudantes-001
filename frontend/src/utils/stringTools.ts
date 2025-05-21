const floatConverter = (str: string) => {
  let _str = str
    .replaceAll(/[^0-9,.]/g, '')
    .replaceAll('.', '_')
    .replaceAll(',', '_');

  if (_str.slice(-3).includes('_')) {
    let parts = _str.split('_');
    let decimal = parts[parts.length - 1];
    let number = parts.slice(0, -1).join('');
    _str = number + '.' + decimal;
    return String(parseFloat(_str).toFixed(2));
  }

  _str = _str.replace(/\./g, '').replace(/,/g, '').replace(/_/g, '');
  return String(parseFloat(_str).toFixed(2));
};
const convertStringToCurrencyFormat = (str: string) => {
  let _str = str;
  // Substitui vírgula por ponto
  _str = _str.replace(',', '.');

  // Remove letras e caracteres especiais, exceto números e ponto
  _str = _str.replace(/[^0-9.]/g, '');

  // Impede múltiplos pontos
  _str = _str.replace(/\.+/g, '.');

  // Remove zeros à esquerda, mas mantém "0" isolado
  _str = _str.replace(/^0+(\d)/, '$1');

  return _str;
};
function formatToReal(valorStr: string) {
  // Remove qualquer espaço ou caractere indesejado
  const limpo = valorStr.replace(/[^\d.]/g, '');

  // Converte para número float
  const numero = parseFloat(limpo);

  if (isNaN(numero)) {
    return 'Valor inválido';
  }

  // Formata para BRL (Real Brasileiro)
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const stringTools = {
  floatConverter,
  convertStringToCurrencyFormat,
  formatToReal,
};
export default stringTools;
