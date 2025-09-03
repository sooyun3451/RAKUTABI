import React from 'react';
import '../css/footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="top-footer">
        <img src="/images/RAKUTABI_logo_gray.png" alt="로고 그레이" />
        <p>
          상호명: Rakutabi Company Pte. Ltd. | 담당자명: 이든 카터 (Ethan
          Carter) | 사업자 주소: 4F, 123, Teheran-ro, Gangnam-gu, Seoul, 06130,
          Republic of Korea <br />
          전화번호: +82-10-1234-5678 | 이메일: krtripservice@Rakutabi.com |
          사업자 등록 번호: 1034506877R | 통신판매업 신고 번호: 2025-공정-0136{' '}
          <br />
          호스팅 서비스 제공자 상호명: Rakutabi Company Pte. Ltd.
        </p>
        <p>
          라쿠타비는 온라인 판매를 중개하는 역할을 하며, 실제 거래의 당사자가
          아닙니다. <br />
          예약, 이용, 환불 등 상품과 관련된 모든 의무와 책임은 각 판매자에게
          있습니다.
        </p>
      </div>
      <div className="center-footer">
        <ul className="center-ul">
          <li>
            <div className="footer-title">도움말 문의</div>
            <p>도움말 센터</p>
            <p>자주 묻는 질문(FAQ)</p>
            <p>개인정보 처리방침</p>
            <p>쿠키 정책</p>
            <p>이용 약관</p>
            <p>쿠키 설정 관리</p>
            <p>디지털 서비스법(EU)</p>
            <p>콘텐츠 가이드라인 & 신고</p>
            <p>현대판 노예 제도 반대 성명</p>
          </li>
          <li>
            <div className="footer-title">회사명</div>
            <p>회사 소개</p>
            <p>채용 정보</p>
            <p>프레스센터 / 보도자료</p>
            <p>블로그</p>
            <p>포인트맥스</p>
          </li>
          <li>
            <div className="footer-title">여행지</div>
            <p>국가별</p>
            <p>모든 항공편 노선</p>
          </li>
          <li>
            <div className="footer-title">파트너</div>
            <p>YCS 파트너 포털</p>
            <p>Partner Hub</p>
            <p>라쿠타비 광고문의</p>
            <p>제휴 파트너</p>
            <p>라쿠타비 API 안내</p>
          </li>
          <li>
            <div className="footer-title">모바일 라쿠타비</div>
            <p>IOS</p>
            <p>Android</p>
          </li>
        </ul>
      </div>
      <div className="last-footer">
        <div className="last-title">
          <p>
            All material herein © 2005 – 2025 Rakutabi Company Pte. Ltd., All
            Rights Reserved. <br />
            라쿠타비는 온라인 여행 및 관련 서비스 분야의 세계적인 선도 기업인
            trip japans Inc.의 일부입니다.
          </p>
          <div className="footer-bottom">
            <div className="store-icon">
              <img src="/images/apple.png" alt="애플 아이콘" />
              <img src="/images/playstore.png" alt="플레이 스토어 아이콘" />
            </div>
            <div className="footer-icon">
              <img src="/images/facebook.png" alt="페이스북" />
              <img src="/images/instagram.png" alt="인스타" />
              <img src="/images/kakao_talk.png" alt="카카오톡" />
              <img src="/images/youtube.png" alt="유튜브" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
