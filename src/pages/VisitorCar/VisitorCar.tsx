import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const VisitorCar = () => {
  useUnderConstructionAlert('방문차량등록');

  return (
    <>
      <Header title="방문차량등록" type="sub" hasBackButton={true} />
      <div style={{ padding: '20px', textAlign: 'center' }}></div>
    </>
  );
};

export default VisitorCar;
