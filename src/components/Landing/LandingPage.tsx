import ServiceIntro from './ServiceIntro';
import DevicePreview from './DevicePreview';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AppRoutes from '../../routes/AppRoutes';
import Alert from '../common/Alert/Alert';
import { useAlertStore } from '../../stores/alertStore';
import MobileBanner from '../common/Banner/MobileBanner';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const { isOpen, title, content, closeAlert } = useAlertStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={`landing-container ${isMobile || isTablet ? 'mobile-view' : ''}`}
    >
      <div className="background-hexagon"></div>
      <DevicePreview>
        <div className="app-container">
          <MobileBanner />
          <AppRoutes />
          {isOpen && (
            <Alert
              alertTitle={title}
              alertContent={content}
              onClose={closeAlert}
            />
          )}
        </div>
      </DevicePreview>
      <ServiceIntro />
    </div>
  );
};

export default LandingPage;
