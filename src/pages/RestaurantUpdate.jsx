import React from 'react';
import RestaurantItem from '../components/RestaurantItem';

export default function RestaurantUpdate() {
  return(
    <div id='RestaurantUpdate'>
      <RestaurantItem isEdit={true} />
    </div>
  )
}