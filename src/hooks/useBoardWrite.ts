import axios from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../api/types';

export const useBoardWrite = (feedId?: number) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<
    (File | { fullUrl: string; url: string })[]
  >([]);
  const [deleteFileUrls, setDeleteFileUrls] = useState<string[]>([]);
  const [feedType, setFeedType] = useState<'FEED' | 'QUESTION'>('FEED');
  const [apartmentId, setApartmentId] = useState<number>(1);

  const navigate = useNavigate();
  const isEditMode = !!feedId;

  const boardMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = isEditMode
        ? `/api/community/feeds/${feedId}`
        : '/api/community/feeds';
      const method = isEditMode ? 'put' : 'post';

      const response = await axios({
        url,
        method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      navigate('/community');
      console.log(isEditMode ? '게시글 수정 성공' : '게시글 등록 성공');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error(
        isEditMode ? '게시글 수정 실패:' : '게시글 등록 실패:',
        error
      );
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
      if (file instanceof File) {
        formData.append('multipartFileList', file);
      }
    });

    if (isEditMode && deleteFileUrls.length > 0) {
      const deleteUrlsBlob = new Blob([JSON.stringify(deleteFileUrls)], {
        type: 'application/json',
      });
      formData.append('deleteFileUrls', deleteUrlsBlob);
    }

    boardMutation.mutate(formData);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => {
      const deletedImage = prev[index];

      if (typeof deletedImage !== 'string' && !(deletedImage instanceof File)) {
        setDeleteFileUrls((prevUrls) => [...prevUrls, deletedImage.url]);
      }

      return prev.filter((_, i) => i !== index);
    });
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
    isEditMode,
    isLoading: boardMutation.isPending,
  };
};
