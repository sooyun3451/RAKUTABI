import React, { useEffect, useState } from 'react';
import RestaurantItem from '../components/RestaurantItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RestaurantUpdate() {

  const {id} = useParams();
  const [restaurant, setRestaurant] = useState(null);

  
  // const fetchData = async () => {
    //   const response = await axios.get('/data/restaurantDetail.json');
    //   const data = response.data;
    //   setRestaurant(data[id]);
    // }
    const fetchData = async () => {
      const response = await axios.get('/data/restaurantDetail.json');
      const data = response.data;
      const targetData = data.find(item => item.id === Number(id));
      setRestaurant(targetData);
    };
    
    useEffect(()=>{
      fetchData();
    }, [id]);

  return(
    <div id='RestaurantUpdate'>
      <RestaurantItem isEdit={true} restaurant={restaurant} id={id} />
    </div>
  )
}