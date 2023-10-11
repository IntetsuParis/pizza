import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

const FullPizza = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6515c9d209e3260018c924b1.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log('Ошибка при получении', error);
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return 'Загрузка..';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
