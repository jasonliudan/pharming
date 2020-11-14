import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';


const getPrice = async (id) => {
    const response = await axios({
        url: `${API_URL}/simple/price?ids=${id}&vs_currencies=USD`,
        method: 'GET',
    });
    const priceid = response.data[id];
    return priceid !== undefined ? priceid.usd : 0;
}

export default {
    getPrice
};
