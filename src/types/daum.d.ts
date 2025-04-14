declare global {
  interface Window {
    daum: {
      Postcode: new (config: { 
        oncomplete: (data: { 
          address: string;
          addressType: string;
          userSelectedType: string;
          autoMappingAddress: string;
          roadAddress: string;
          jibunAddress: string;
          buildingName: string;
          zonecode: string;
        }) => void;
        width?: string;
        height?: string;
        embed?: boolean;
        animation?: boolean;
      }) => { 
        open: () => void;
        embed: (element: HTMLElement | null) => void;
      };
    };
  }
}

export {}; 