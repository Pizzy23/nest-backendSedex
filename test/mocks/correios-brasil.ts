const mockResponse = {
  logradouro: 'Rua Teste',
  bairro: 'Bairro Teste',
  localidade: 'Cidade Teste',
  uf: 'SP',
};

export const consultarCep = jest.fn().mockResolvedValue(mockResponse);

export default { consultarCep };
