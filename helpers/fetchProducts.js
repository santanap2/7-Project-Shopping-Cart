const fetchProducts = async (item) => {
  try {
    if (!item) throw new Error('You must provide an url');
    const api = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
    const data = await fetch(api);
    const json = await data.json();
    return await json;
  } catch (error) {
    return error;
  }
};

console.log(fetchProducts('computador'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
