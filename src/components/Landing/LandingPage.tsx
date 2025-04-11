import ServiceIntro from './ServiceIntro';
import DevicePreview from './DevicePreview';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AppRoutes from '../../routes/AppRoutes';
import Alert from '../common/Alert/Alert';
import { useAlertStore } from '../../stores/alertStore';
import MobileBanner from '../common/Banner/MobileBanner';

const LandingPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const { isOpen, title, content, closeAlert } = useAlertStore();

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
