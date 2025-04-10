import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertStore } from '../stores/alertStore';

/**
 * 개발 중인 페이지에서 사용할 Alert 훅
 * @param featureName 기능 이름 (예: '방문차량등록', '공지사항' 등)
 */
const useUnderConstructionAlert = (featureName: string) => {
  const navigate = useNavigate();
  const { openAlert, setTitle, setContent } = useAlertStore();
  const originalCloseAlertRef = useRef<() => void>();

  useLayoutEffect(() => {
    setTitle('알림');
    setContent(`${featureName} 기능은 현재 개발 중입니다.<br />빠른 시일 내에 서비스 제공 예정입니다.`);
    openAlert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureName]); // 의도적으로 다른 의존성 제외

  useEffect(() => {
    originalCloseAlertRef.current = useAlertStore.getState().closeAlert;
    
    const handleClose = () => {
      if (originalCloseAlertRef.current) {
        originalCloseAlertRef.current();
      }
      navigate(-1);
    };
    
    /**
     * Alert의 기본 닫기 동작을 오버라이드합니다.
     * 이 페이지에서는 Alert를 닫을 때 다음 동작을 수행합니다:
     * 1. 원래 closeAlert 함수를 실행하여 Alert를 닫습니다.
     * 2. 이전 페이지로 자동 이동합니다(navigate(-1)).
     * 
     * 이렇게 함으로써 사용자가 개발 중인 페이지에 접근했을 때
     * Alert를 확인한 후 자동으로 이전 페이지로 돌아갈 수 있게 됩니다.
     */
    useAlertStore.setState({ closeAlert: handleClose });

    return () => {
      if (originalCloseAlertRef.current) {
        useAlertStore.setState({ closeAlert: originalCloseAlertRef.current });
      }
    };
  }, [navigate]); 
};

export default useUnderConstructionAlert; 