import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('루트 엘리먼트가 없습니다.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// 앱 컨테이너 제스처 처리
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app-container') as HTMLElement;
  const swipeIndicator = document.querySelector(
    '.swipe-indicator'
  ) as HTMLElement;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const toggleExpanded = (shouldExpand: boolean) => {
    appContainer.style.transition =
      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    if (shouldExpand) {
      appContainer.classList.add('expanded');
      appContainer.style.transform = 'translateY(0)';
      swipeIndicator.setAttribute('aria-expanded', 'true');
    } else {
      appContainer.classList.remove('expanded');
      appContainer.style.transform = 'translateY(70%)';
      swipeIndicator.setAttribute('aria-expanded', 'false');
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    currentY = startY;
    appContainer.style.transition = 'none';
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    const newTransform = Math.max(
      0,
      Math.min(70, (diff / window.innerHeight) * 100)
    );

    if (appContainer.classList.contains('expanded')) {
      if (diff > 0) {
        appContainer.style.transform = `translateY(${newTransform}%)`;
      }
    } else {
      if (diff < 0) {
        appContainer.style.transform = `translateY(${70 - Math.abs(newTransform)}%)`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const diff = currentY - startY;
    const threshold = window.innerHeight * 0.15; // 15% of viewport height

    toggleExpanded(
      appContainer.classList.contains('expanded')
        ? Math.abs(diff) < threshold
        : Math.abs(diff) > threshold
    );
  };

  // 키보드 접근성
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded(!appContainer.classList.contains('expanded'));
    } else if (
      e.key === 'Escape' &&
      appContainer.classList.contains('expanded')
    ) {
      toggleExpanded(false);
    }
  };

  // 이벤트 리스너 등록
  appContainer?.addEventListener('touchstart', handleTouchStart);
  appContainer?.addEventListener('touchmove', handleTouchMove);
  appContainer?.addEventListener('touchend', handleTouchEnd);
  swipeIndicator?.addEventListener('keydown', handleKeyDown);

  // 초기 상태 설정
  swipeIndicator?.setAttribute('aria-expanded', 'false');
});
