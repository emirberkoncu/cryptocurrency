import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 300,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => setCryptos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCryptoClick = (id) => {
    navigate(`/crypto/${id}`);
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Kripto Para Listesi
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Kripto para ara..."
            className="w-full p-2 border border-gray-300 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-5 font-bold  text-lg mb-4 text-center">
          <div className="w-12">#</div>
          <div className="w-16">Coin</div>
          <div className="w-32">Price</div>
          <div className="w-32">24H Change</div>
          <div className="w-36">Market Cap</div>
        </div>

        <div className="overflow-y-auto max-h-[550px]">
          {' '}
          <ul>
            {filteredCryptos.map((crypto, index) => (
              <li
                key={crypto.id}
                className="grid grid-cols-5 items-center border-b py-4 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleCryptoClick(crypto.id)}
              >
                <div className="w-12">{index + 1}</div>

                <div className="flex items-center justify-start space-x-2">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-6 h-6"
                  />
                  <span>{crypto.symbol.toUpperCase()}</span>
                </div>

                <div className="w-32">${crypto.current_price.toFixed(2)}</div>

                <div
                  className={`w-32 ${
                    crypto.price_change_percentage_24h < 0
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </div>

                <div className="w-36">
                  ${crypto.market_cap.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CryptoList;
