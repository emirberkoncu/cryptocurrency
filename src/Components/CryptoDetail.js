import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => setCrypto(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: 7,
        },
      })
      .then((response) => {
        const prices = response.data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString(),
          value: price[1],
        }));
        setChartData({
          labels: prices.map((price) => price.time),
          datasets: [
            {
              label: `${id.toUpperCase()} Price (USD)`,
              data: prices.map((price) => price.value),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!crypto || !chartData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-500">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={crypto.image.large}
            alt={crypto.name}
            className="mx-auto w-16 h-16 mb-2"
          />
          <h1 className="text-3xl font-bold">{crypto.name}</h1>
        </div>

        <div className="my-6">
          <Line data={chartData} />
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex flex-col text-xl">
            <span className="mb-2">
              <strong>Market Rank</strong>
            </span>
            <span className="mb-2">
              <strong>Current Price</strong>
            </span>
            <span className="mb-2">
              <strong>Market Cap</strong>
            </span>
            <span className="mb-2">
              <strong>24 Hour High</strong>
            </span>
            <span>
              <strong>24 Hour Low</strong>
            </span>
          </div>
          <div className="flex flex-col text-right text-xl">
            <span className="mb-2">{crypto.market_cap_rank}</span>
            <span className="mb-2">
              ${crypto.market_data.current_price.usd.toLocaleString()}
            </span>
            <span className="mb-2">
              ${crypto.market_data.market_cap.usd.toLocaleString()}
            </span>
            <span className="mb-2">
              ${crypto.market_data.high_24h.usd.toLocaleString()}
            </span>
            <span>${crypto.market_data.low_24h.usd.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/">
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600">
              Ana Sayfa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;
