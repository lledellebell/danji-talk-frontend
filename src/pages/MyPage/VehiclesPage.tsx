import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const VehiclesPage = () => {
  useUnderConstructionAlert('방문차량 목록');

  return (
    <>
      <Header 
        title="방문차량 목록" 
        type="sub" 
        hasBackButton={true}
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
      </div>
    </>
  );
};

export default VehiclesPage; 