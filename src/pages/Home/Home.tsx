import { useEffect } from 'react';
import { useComplexStore } from '../../stores/complexStore';

const Home = () => {
  const { complexes, fetchComplexes, isLoading, error } = useComplexStore();

  useEffect(() => {
    fetchComplexes();
  }, [fetchComplexes]);

  return (
    <div>
      <h1>단지 목록</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>에러: {error}</p>
      ) : (
        <div className="complex-grid">
          {complexes.map(complex => (
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