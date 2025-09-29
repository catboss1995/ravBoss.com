/**
 * 處理名片懸停效果和廣告區塊定位
 */

// 立即執行函數，確保代碼立即運行
(function() {
  console.log('Card hover script loaded'); // 調試信息
  
  // 初始化函數
  function initCardHover() {
    console.log('Initializing card hover effects'); // 調試信息
    
    // 獲取所有名片容器
    const cardContainers = document.querySelectorAll('.card-container');
    console.log('Found card containers:', cardContainers.length); // 調試信息
    
    if (cardContainers.length === 0) {
      console.log('No card containers found, will retry later');
      // 如果沒有找到卡片容器，可能是因為DOM還沒有完全加載，稍後再試
      setTimeout(initCardHover, 1000);
      return;
    }
    
    // 為每個名片容器添加事件監聽器
    cardContainers.forEach((container, index) => {
      const card = container.querySelector('.business-card');
      const adSection = container.querySelector('.ad-section');
      
      console.log(`Card ${index + 1}:`, card ? 'found' : 'not found'); // 調試信息
      console.log(`Ad section ${index + 1}:`, adSection ? 'found' : 'not found'); // 調試信息
      
      if (card && adSection) {
        // 確保廣告區塊的初始樣式
        adSection.style.position = 'fixed';
        adSection.style.zIndex = '1000';
        
        // 鼠標進入名片
        card.addEventListener('mouseenter', () => {
          console.log(`Card ${index + 1} hovered`); // 調試信息
          
          // 獲取名片的位置和尺寸
          const cardRect = card.getBoundingClientRect();
          console.log('Card rect:', cardRect); // 調試信息
          
          // 設置廣告區塊的位置
          adSection.style.left = `${cardRect.left}px`;
          adSection.style.top = `${cardRect.bottom + window.scrollY}px`;
          adSection.style.width = `${cardRect.width}px`;
          
          // 確保廣告區塊可見
          adSection.style.opacity = '1';
          adSection.style.visibility = 'visible';
          adSection.style.pointerEvents = 'auto';
          
          console.log('Ad section styles applied:', {
            left: adSection.style.left,
            top: adSection.style.top,
            width: adSection.style.width,
            opacity: adSection.style.opacity,
            visibility: adSection.style.visibility
          }); // 調試信息
        });
      }
    });
    
    // 處理窗口調整大小事件
    window.addEventListener('resize', () => {
      console.log('Window resized'); // 調試信息
      
      // 獲取所有可見的廣告區塊
      const visibleAdSections = document.querySelectorAll('.ad-section[style*="visibility: visible"]');
      console.log('Visible ad sections:', visibleAdSections.length); // 調試信息
      
      visibleAdSections.forEach((adSection, index) => {
        // 找到對應的名片
        const container = adSection.closest('.card-container');
        if (container) {
          const card = container.querySelector('.business-card');
          if (card) {
            // 重新計算位置
            const cardRect = card.getBoundingClientRect();
            
            adSection.style.left = `${cardRect.left}px`;
            adSection.style.top = `${cardRect.bottom + window.scrollY}px`;
            adSection.style.width = `${cardRect.width}px`;
            
            console.log(`Repositioned ad section ${index + 1}`); // 調試信息
          }
        }
      });
    });
  }
  
  // 如果 DOM 已經加載完成，立即執行；否則等待 DOMContentLoaded 事件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardHover);
  } else {
    // 給 Vue 組件足夠的時間渲染
    setTimeout(initCardHover, 1000);
  }
  
  // 為了處理 Vue 組件可能在 DOMContentLoaded 之後加載的情況
  // 我們也添加一個延遲執行
  setTimeout(initCardHover, 2000);
})();