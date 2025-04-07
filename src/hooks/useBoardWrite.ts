import axios from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export const useBoardWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [feedType, setFeedType] = useState<'FEED' | 'QUESTION'>('FEED');
  const [apartmentId, setApartmentId] = useState<number>(1);

  const boardWriteMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post('/api/community/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // TODO: 페이지 이동 등 후처리
      console.log('게시글 등록 성공');
    },
    onError: (error: any) => {
      console.error('게시글 등록 실패:', error);
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();

    const requestDto = {
      title,
      contents: content,
      feedType,
      apartmentId,
    };

    formData.append(
      'requestDto',
      new Blob([JSON.stringify(requestDto)], { type: 'application/json' })
    );

    images.forEach((file) => {
      formData.append('multipartFileList', file);
    });

    boardWriteMutation.mutate(formData);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    images,
    setImages,
    feedType,
    setFeedType,
    apartmentId,
    setApartmentId,
    handleImageUpload,
    handleImageDelete,
    handleSubmit,
    isLoading: boardWriteMutation.isPending,
  };
};
