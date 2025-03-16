import styles from './Complexes.module.scss';
import { InputField } from '../../components/common/InputField/InputField';
import { useState } from 'react';

// {
//     "name": "아파트 이름",
//     "region": "지역",
//     "location": "위치",
//     "totalUnit": 100,
//     "parkingCapacity": 200,
//     "buildingRange": "101동 ~ 123동 (23개동)"
//   }

const NotImage = () => {
  return (
    <div className={styles['not-image']}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles['not-image__icon']}
        preserveAspectRatio="none"
      >
        <path
          d="M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M19 8V2M16 5H22M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Complexes = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [parkingCapacity, setParkingCapacity] = useState('');
  const [buildingRange, setBuildingRange] = useState('');

  const regionActionButton = {
    label: '검색',
    onClick: () => setRegion('1'),
    disabled: false,
  };

  const buildingRangeActionButton = {
    label: '설정',
    onClick: () => setRegion('1'),
    disabled: false,
  };

  return (
    <form className={styles['complexes-form']}>
      <InputField
        label="단지명"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="단지명을 입력해주세요"
        required
        autoComplete="region"
      />
      <InputField
        label="주소"
        name="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        actionButton={regionActionButton}
        placeholder="주소를 입력해주세요"
        required
        autoComplete="region"
      />
      <InputField
        label="상세주소"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="상세주소를 입력해주세요"
        required
        autoComplete="location"
      />
      <InputField
        label="세대 수"
        name="totalUnit"
        value={totalUnit}
        onChange={(e) => setTotalUnit(e.target.value)}
        placeholder="세대 수를 입력해주세요 (숫자만 입력)"
        required
        autoComplete="totalUnit"
      />
      <InputField
        label="주차 가능 대수"
        name="parkingCapacity"
        value={parkingCapacity}
        onChange={(e) => setParkingCapacity(e.target.value)}
        placeholder="주차 가능 대수를 입력해주세요 (숫자만 입력)"
        required
        autoComplete="parkingCapacity"
      />
      <InputField
        label="동"
        name="buildingRange"
        value={buildingRange}
        onChange={(e) => setBuildingRange(e.target.value)}
        actionButton={buildingRangeActionButton}
        placeholder="단지 동을 설정해주세요"
        required
        autoComplete="buildingRange"
      />
      <div className={styles['complexes-image-container']}>
        <span>단지 이미지</span>
        <div className={styles['complexes-image']}>
          <NotImage />
          <p className={styles['complexes-image-description']}>
            390 * 460
            <br /> 최대 10장의 이미지 첨부가 가능합니다.
          </p>
        </div>
      </div>
      <button className={styles['submit-button']}>등록</button>
    </form>
  );
};
