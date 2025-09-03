import React, { useState, useEffect} from 'react';
import {FaStar} from "react-icons/fa";
import "../css/restaurant_write.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function RestaurantItem({isEdit}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const areaList = [
    { value: "tokyo", name: "도쿄" },
    { value: "osaka", name: "오사카" },
    { value: "sapporo", name: "삿포로" },
    { value: "fukuoka", name: "후쿠오카" },
    { value: "okinawa", name: "오키나와" }
  ];
  const [selected, setSelected] = useState("");
  
  const handleSelect = (e)=>{
    setSelected(e.target.value);
  }

  const [rating, setRating] = useState(0);
  const totalStars = 5;

  const [name, setName] = useState('');
  const [location, setLocation ] = useState('');
  const [content, setContent] = useState('');
  
  const [files, setFiles] = useState([]);
  const maxFileCount = 10;

  const handleFileUpload = (e)=>{
    const newFiles = Array.from(e.target.files);
    if(files.length + newFiles.length > maxFileCount) {
      alert(`최대 ${maxFileCount}개의 파일만 업로드할 수 있습니다.`);
      e.target.value = null;
      return;
    }
    setFiles([...files, ...newFiles]);
  };

  // useEffect(()=>{
  //   if(isEdit && id){
  //     setTitle(restaurant.name ?? '');
  //     setLocation(restaurant.location ?? '');
  //     setContent(restaurant.content ?? '');
  //     }
  // }, [isEdit, id, restaurant]);
  
  const handleChangeName = (e)=>{
    setName(e.target.value);
  }
  const handleChangeLocation = (e)=>{
    setLocation(e.target.value);
  }
  const handleChangeContent = (e)=>{
    setContent(e.target.value);
  }
  const handleClickSave = ()=>{
    if (confirm(isEdit ? '수정하시겠습니까?' : '작성하시겠습니까?')) {
      if (isEdit) {
        navigate('/restaurant/write');
      } else {
        navigate(`/restaurant/detail/${id}`);
      }
    }
  }
  const handleClickCancle = () => {
    if (confirm(isEdit ? '수정을 취소하시겠습니까?' : '작성을 취소하시겠습니까?')) {
      if (isEdit) {
        navigate('/restaurant/write');
      } else {
        navigate(`/restaurant/list/${id}`);
      }
    }
  };

  return(
    <div id='RestaurantItem'>
      <div className='title'>
        <div className='left'>
          <div className='restaurantArea'>
            <select onChange={handleSelect} value={selected}>
              {areaList.map((item)=>
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              )}
            </select>
          </div>
          <div className='restaurantName'>
            <input
              type="text"
              placeholder='식당이름을 작성해주세요.'
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div className='rateStar'>
            <p className='star'>
              {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={starValue}
                    color={starValue <= rating ? '#ffd900' : 'gray'}
                    onClick={() => setRating(starValue)}
                    style={{ cursor: 'pointer' }}
                  />
                );
              })}
            </p>
            <p className='selectStar'>별점을 선택해주세요.</p>
          </div>
        </div>
        <div className='right'>
          <div className='location'>
            <p><img src="../../public/images/icon_location3.png" alt="location" /></p>
            <p className='locationInput'>
              <input
                type="text"
                placeholder='위치를 작성해주세요.'
                value={location}
                onChange={handleChangeLocation}
              />
            </p>
          </div>
        </div>
      </div>
      <div className='review'>
        <div className='content'>
          <textarea
            placeholder='내용을 작성해주세요.'
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <div className='function'>
          <div className='addfile'>
            <div className='fileInfoDisplay'>
              {files.length > 0
              ? <p className='fileName'>{files.map(file => file.name).join(', ')}</p>
              : <p style={{ color: 'gray'}}>최대 10개의 파일만 업로드할 수 있습니다.</p>
              }
            </div>
            <label htmlFor='fileUpload' className='fileUploadBtn'>
              사진 첨부하기
            </label>
            <input 
              id='fileUpload'
              type='file' 
              onChange={handleFileUpload} 
              accept='image/*'
              multiple 
              style={{ display: 'none' }} 
            />
          </div>
          <div className='writeBtn'>
            <button className='writeDone' onClick={handleClickSave}>작성 완료</button>
            <button className='writeCancle' onClick={handleClickCancle}>작성 취소</button>
          </div>
        </div>
      </div>
    </div>
  )
}
