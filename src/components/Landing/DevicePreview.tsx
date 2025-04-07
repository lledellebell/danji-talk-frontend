import { ReactNode } from 'react';

interface DevicePreviewProps {
  children?: ReactNode;
}

const DevicePreview = ({ children }: DevicePreviewProps) => {
  return (
    <div className="device-frame">
      <div className="preview-container">
        <div className="ios-status-bar">
          <div className="ios-status-bar__time">
            9:41
          </div>
          <div className="ios-status-bar__icons">
            <div className="network">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="wifi"></div>
            <div className="battery"></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DevicePreview; 