import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const ScrapsPage = () => {
  useUnderConstructionAlert('스크랩한 글');

  return (
    <>
      <Header title="스크랩한 글" type="sub" hasBackButton={true} />
      <div style={{ padding: '20px', textAlign: 'center' }}></div>
    </>
  );
};

export default ScrapsPage;
