import { cpf } from 'cpf-cnpj-validator';

// Verifica se é cpf
export function isCpf(value) {
  const valueClean = value.replace(/\D/g, '');
  if (valueClean.length <= 11) {
    return true;
  }
  return false;
}
// Verifica se é cpf válido
export function isCpfValid(value) {
  const valueClean = value.replace(/\D/g, '');
  if (cpf.isValid(valueClean)) {
    return true;
  }
  return false;
}
// Formata o cpf
export function formatCpf(value) {
  return cpf.format(value);
}
const cpfCnpj = {
  isCpf,
  isCpfValid,
  formatCpf,
};
export default cpfCnpj;
