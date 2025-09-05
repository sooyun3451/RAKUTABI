import React, { useState, useEffect} from 'react';
import {FaStar} from "react-icons/fa";
import "../css/restaurant_write.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function RestaurantItem({isEdit, restaurant}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const areaList = [
    { value: "도쿄", name: "도쿄" },
    { value: "오사카", name: "오사카" },
    { value: "삿포로", name: "삿포로" },
    { value: "후쿠오카", name: "후쿠오카" },
    { value: "오키나와", name: "오키나와" }
  ];

  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [location, setLocation ] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState([]);
  const [files, setFiles] = useState([]);

  const totalStars = 5;
  const maxFileCount = 10;
  
  useEffect(()=>{
    console.log(restaurant);
    if(isEdit && restaurant){
      setArea(restaurant.area || '');
      setName(restaurant.name || '');
      setRating(restaurant.star ? restaurant.star.match(/★/g).length : 0);
      setLocation(restaurant.location || '');
      setContent(restaurant.content || '');
      setPhoto(restaurant.photo || []);
    }
  }, [isEdit, restaurant]);

  const handleChangeArea = (e)=>{ setArea(e.target.value); }
  const handleChangeName = (e)=>{ setName(e.target.value); }
  const handleChangeLocation = (e)=>{ setLocation(e.target.value); }
  const handleChangeContent = (e)=>{ setContent(e.target.value); }

  const handleFileUpload = (e)=>{
    const newFiles = Array.from(e.target.files);
    const totalFiles = (isEdit ? photo.length : 0) + files.length + newFiles.length;

    if (totalFiles > maxFileCount) {
      alert(`최대 ${maxFileCount}개의 파일만 업로드할 수 있습니다.`);
      e.target.value = null;
      return;
    }
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (fileName, type) => {
    if(type === 'new') {
        setFiles(files.filter(file => file.name !== fileName));
    } else { // 'existing'
        setPhoto(photo.filter(p => p !== fileName));
    }
  }
  
  const handleClickSave = ()=>{
    if (confirm(isEdit ? '수정하시겠습니까?' : '작성하시겠습니까?')) {
      navigate(`/restaurant/detail/${id-1}`);
    }
  }
  const handleClickCancle = () => {
    if (confirm(isEdit ? '수정을 취소하시겠습니까?' : '작성을 취소하시겠습니까?')) {
      if (isEdit) {
        navigate('/myPage');
      } else {
        navigate('/restaurant/list');
      }
    }
  };

  return(
    <div id='RestaurantItem'>
      <div className='title'>
        <div className='left'>
          <div className='restaurantArea'>
            <select onChange={handleChangeArea} value={area}>
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
              placeholder={isEdit ? '' : '식당이름을 작성해주세요.'}
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
            <p className='selectStar'>{rating === 0 ? '별점을 선택해주세요.' : `${rating}.0`}</p>
          </div>
        </div>
        <div className='right'>
          <div className='location'>
            <p><img src="/images/icon_location3.png" alt="location" /></p>
            <p className='locationInput'>
              <input
                type="text"
                placeholder={isEdit ? '' : '위치를 작성해주세요.'}
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
            placeholder={isEdit ? '' : '내용을 작성해주세요.'}
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <div className='function'>
          <div className='addfile'>
            <div className='fileInfoDisplay'>
              {/* 1. 원래 있던 사진 목록 보여주기 */}
              {isEdit && photo.map((p, index) => {
                const fileName = p.split('/').pop();
                return (
                  <div key={`existing-${index}`} className='fileItem'>
                    <span>{fileName}</span>
                    <button onClick={() =>
                      handleRemoveFile(p, 'existing')} className='removeBtn'>x</button>
                  </div>
                )
              })}
              {/* 2. 새로 추가한 사진 목록 보여주기 */}
              {files.map((file, index) =>(
                <div key={`new-${index}`} className='fileItem'>
                  <span>{file.name}</span>
                  <button onClick={() =>
                    handleRemoveFile(file.name, 'new')} className='removeBtn'>x</button>
                </div>
              ))}
              {/* 3. 아무 파일도 없을 때 안내 문구 보여주기 */}
              {photo.length === 0 && files.length === 0 && (
                <p style={{ color: 'gray' }}>
                  최대 {maxFileCount}개의 파일을 업로드할 수 있습니다.
                </p>
              )}
            </div>
            <label htmlFor='fileUpload' className='fileUploadBtn'>
              사진 첨부
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
            <button className='writeDone' onClick={handleClickSave}>
              {isEdit ? '수정 완료' : '작성 완료'}
            </button>
            <button className='writeCancle' onClick={handleClickCancle}>
              {isEdit ? '수정 취소' : '작성 취소'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
