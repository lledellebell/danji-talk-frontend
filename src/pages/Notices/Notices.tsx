import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const Notices = () => {
  useUnderConstructionAlert('공지사항');

  return (
    <>
      <Header 
        title="공지사항" 
        type="sub" 
        hasBackButton={true}
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
      </div>
    </>
  );
};

export default Notices; 