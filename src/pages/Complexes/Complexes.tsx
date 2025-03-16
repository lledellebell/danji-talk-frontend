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
    </form>
  );
};
