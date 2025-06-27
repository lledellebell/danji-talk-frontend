import { useEffect } from 'react';
import { useComplexStore } from '../../stores/complexStore';

const Home = () => {
  const { complexes, fetchComplexes, isLoading, error } = useComplexStore();

  useEffect(() => {
    if (complexes.length === 0 && !isLoading && !error) {
      fetchComplexes();
    }
  }, [complexes.length, fetchComplexes, isLoading, error]);

  return (
    <div>
      <h1>단지 목록</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>에러: {error}</p>
      ) : complexes.length === 0 ? (
        <p>등록된 단지가 없습니다.</p>
      ) : (
        <div className="complex-grid">
          {complexes.map((complex) => (
            <div key={complex.id} className="complex-card">
              <h2>{complex.name}</h2>
              <p>{complex.region}</p>
              {/* 다른 단지 정보 표시 */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
