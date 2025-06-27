import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'core-js/features/promise';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/object/assign';
import 'core-js/features/string/includes';

const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

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

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app-container') as HTMLElement;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const toggleExpanded = (shouldExpand: boolean) => {
    appContainer.style.transition =
      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    if (shouldExpand) {
      appContainer.classList.add('expanded');
      appContainer.style.transform = 'translateY(0)';
    } else {
      appContainer.classList.remove('expanded');
      appContainer.style.transform = 'translateY(70%)';
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

  appContainer?.addEventListener('touchstart', handleTouchStart);
  appContainer?.addEventListener('touchmove', handleTouchMove);
  appContainer?.addEventListener('touchend', handleTouchEnd);
});
