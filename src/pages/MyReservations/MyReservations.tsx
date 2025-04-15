import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const MyReservations = () => {
  useUnderConstructionAlert('내 예약 정보');

  return (
    <>
      <Header title="내 예약 정보" type="sub" hasBackButton={true} />
      <div style={{ padding: '20px', textAlign: 'center' }}></div>
    </>
  );
};

export default MyReservations;
