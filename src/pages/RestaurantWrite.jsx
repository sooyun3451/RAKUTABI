import React from 'react';
import RestaurantItem from '../components/RestaurantItem';

export default function RestaurantWrite() {
  return(
    <div id='RestaurantWrite'>
      <RestaurantItem isEdit={false} />
    </div>
  )
}