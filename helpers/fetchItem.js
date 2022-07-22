const fetchItem = async (itemID) => {
  try {
    if (!itemID) throw new Error('You must provide an url');
    const api = `https://api.mercadolibre.com/items/${itemID}`;
    const data = await fetch(api);
    const json = await data.json();
    return await json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
