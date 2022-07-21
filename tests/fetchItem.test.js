require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('Testa se `fetchItem` é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Testa se `fetchItem` é chamada caso for passado um argumento', async () => {
    expect.assertions(1);
    await fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Testa se `fetchItem` é chamada com o endpoint correto', async () => {
    expect.assertions(1);
    const API = `https://api.mercadolibre.com/items/MLB1615760527`;
    await fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalledWith(API);
  })

  it('Testa se `fetchItem` retorna o objeto esperado', async () => {
    expect.assertions(1);
    expect(await fetchItem("MLB1615760527")).toEqual(item);
  })

  it('Testa se `fetchItem` retorna erro se um argumento não for passado', async () => {
    expect.assertions(1);
    const expected = new Error('You must provide an url');
    expect(await fetchItem()).toEqual(expected);
  })

});
