import Header from '../../layouts/Header';
import useUnderConstructionAlert from '../../hooks/useUnderConstructionAlert';

const PostsPage = () => {
  useUnderConstructionAlert('작성한 글');

  return (
    <>
      <Header 
        title="작성한 글" 
        type="sub" 
        hasBackButton={true}
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
      </div>
    </>
  );
};

export default PostsPage; 