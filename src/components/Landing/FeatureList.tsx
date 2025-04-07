import ChatIcon from '../../assets/icons/chat.svg';
import NoticeIcon from '../../assets/icons/notice.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import InquiryIcon from '../../assets/icons/inquiry.svg';
// import SettingsIcon from '../../assets/icons/settings.svg';

const features = [
  { icon: ChatIcon, label: '채팅' },
  { icon: NoticeIcon, label: '공지사항' },
  { icon: BuildingIcon, label: '시설관리' },
  { icon: InquiryIcon, label: '문의하기' },
  // { icon: SettingsIcon, label: '설정' },
];

const FeatureList = () => {
  return (
    <ul className="feature-list" aria-label="주요 기능">
      {features.map(({ icon, label }) => (
        <li key={label} className="feature-item">
          <img src={icon} className="feature-icon" alt="" aria-hidden="true" />
          <span className="feature-label">{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList; 