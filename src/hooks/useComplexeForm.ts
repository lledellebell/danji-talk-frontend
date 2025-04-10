import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useComplexForm = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [parkingCapacity, setParkingCapacity] = useState('');
  const [buildingRange, setBuildingRange] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const regionActionButton = {
    label: '검색',
    onClick: () => setRegion('1'),
    disabled: false,
  };

  const buildingRangeActionButton = {
    label: '설정',
    onClick: () => setBuildingRange('1'),
    disabled: false,
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImages(fileList);

      const newPreviewUrls: string[] = [];
      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            newPreviewUrls.push(reader.result);
            if (newPreviewUrls.length === fileList.length) {
              setPreviewUrls(newPreviewUrls);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      const requestDto = {
        name,
        region,
        location,
        totalUnit: Number(totalUnit),
        parkingCapacity: Number(parkingCapacity),
        buildingRange,
      };

      const blob = new Blob([JSON.stringify(requestDto)], {
        type: 'application/json',
      });

      formData.append('requestDto', blob);
      images.forEach((img) => formData.append('multipartFileList', img));

      const res = await axios.post(`/api/apartment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      alert('등록 성공!');
    },
    onError: (error) => {
      console.error('등록 실패', error);
      alert('등록에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return {
    values: {
      name,
      region,
      location,
      totalUnit,
      parkingCapacity,
      buildingRange,
      images,
      previewUrls,
    },
    handlers: {
      setName,
      setRegion,
      setLocation,
      setTotalUnit,
      setParkingCapacity,
      setBuildingRange,
      handleImageChange,
    },
    actions: {
      regionActionButton,
      buildingRangeActionButton,
      handleSubmit,
      isLoading: mutation.isPending,
    },
  };
};
