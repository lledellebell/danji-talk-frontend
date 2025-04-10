import ServiceIntro from './ServiceIntro';
import DevicePreview from './DevicePreview';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AppRoutes from '../../routes/AppRoutes';

const LandingPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  return (
    <div
      className={`landing-container ${isMobile || isTablet ? 'mobile-view' : ''}`}
    >
      <div className="background-hexagon"></div>
      <DevicePreview>
        <div className="app-container">
          <AppRoutes />
        </div>
      </DevicePreview>
      <ServiceIntro />
    </div>
  );
};

export default LandingPage;
