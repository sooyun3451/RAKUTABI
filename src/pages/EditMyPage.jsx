import React, { useEffect, useState } from 'react';
import MyPage from '../components/MyPage';
import axios from 'axios';

export default function EditMyPage() {
  const [user, setUser] = useState({});

  const fetchData = async () => {
    const response = await axios.get('/data/user.json');
    setUser(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <MyPage isCheck={false} user={user} onUpdatedUser={handleUpdateUser} />
    </div>
  );
}
