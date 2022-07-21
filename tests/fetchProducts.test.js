require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('Testa se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('Testa se fetch é chamado se `fetchProducts` receber o argumento `computador`', async () => {
    expect.assertions(1);
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  
  it('Testa se o retorno da função `fetchProducts` retorna erro se não for passado um argumento', async () => {
    expect.assertions(1);
    const result = new Error('You must provide an url');
    expect(await fetchProducts('')).toEqual(result);
  });

  it('Testa se ao chamar `fetchProducts` com o argumento `computador` a função usa o endpoint correto', async () => {
    expect.assertions(1);
    const testAPI = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(testAPI);
  });

  it('Testa se a `fetchProducts` retorna o esperado', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
});
