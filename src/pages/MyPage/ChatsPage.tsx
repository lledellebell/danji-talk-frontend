import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const ChatsPage = () => {
  useUnderConstructionAlert('채팅방 목록');

  return (
    <>
      <Header title="채팅방 목록" type="sub" hasBackButton={true} />
      <div style={{ padding: '20px', textAlign: 'center' }}></div>
    </>
  );
};

export default ChatsPage;
