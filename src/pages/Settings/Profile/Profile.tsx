import styles from './Profile.module.scss';

const Profile = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 프로필 업데이트 로직 (API 호출 등)
    alert('프로필이 수정되었습니다.');
  };
  
  return (
    <div className={styles['profile-container']}>
      <form onSubmit={handleSubmit} className={styles['profile-form']}>
        <div className={styles['profile-image-section']}>
          <img 
            src={'/default-profile.png'} 
            alt="프로필 이미지"
            className={styles['profile-image']} 
          />
          <button type="button" className={styles['change-image-button']}>
            이미지 변경
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Profile; 