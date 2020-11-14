import axios from 'axios';
import Config from 'lib/config';
import web3client from './web3client';
import coingecko from './coingecko';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaXNzIjoiZGV4dG9vbHMuaW8iLCJzdWIiOiJhbnlvbmUiLCJyZWYiOiI1MC43LjE1OS4zNCIsImlhdCI6MTU5OTQ5MjEzMH0.VKcBB6v3pspBu4QMzQIk5nV5MGZHoAKDG4Hhkv5dC1E';
const API_URL = 'https://www.dextools.io/api';
const PROXY = 'https://cors-anywhere.herokuapp.com/'


const getEthPrice = async () => {
    const response = await axios({
        method: 'GET',
        url: `${PROXY}${API_URL}/common/ethPrice`,
        headers: {
            authorization: `Bearer ${API_KEY}`
        }
    });
    if (response.data.message !== 'OK') return 0;
    return response.data.result.ethusd;
}


export default {
    getEthPrice
};
