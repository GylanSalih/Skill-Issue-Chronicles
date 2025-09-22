import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  delay?: number;
  className?: string;
  disabled?: boolean;
  trigger?: 'hover' | 'click';
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
  disabled = false,
  trigger = 'hover'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
    if (trigger === 'click') {
      setIsVisible(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const toggleTooltip = () => {
    if (disabled) return;
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const updatePosition = () => {
    if (!tooltipRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    if (position === 'center') {
      // Zentriert auf dem Bildschirm
      top = (viewportHeight - tooltipRect.height) / 2;
      left = (viewportWidth - tooltipRect.width) / 2;
    } else if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
      }

      // Boundary checks
      if (left < 8) left = 8;
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = viewportHeight - tooltipRect.height - 8;
      }
    }

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, position]);

  // Handle click outside and escape key for click trigger
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
            tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
          setIsVisible(false);
        }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsVisible(false);
        }
      };

      const handleButtonClick = (event: MouseEvent) => {
        // Check if the clicked element is a button inside the tooltip
        if (tooltipRef.current && tooltipRef.current.contains(event.target as Node)) {
          const target = event.target as HTMLElement;
          if (target.tagName === 'BUTTON' || target.closest('button')) {
            setIsVisible(false);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleButtonClick);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleButtonClick);
      };
    }
  }, [trigger, isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className={`${styles.tooltipTrigger} ${className}`}
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onFocus={trigger === 'hover' ? showTooltip : undefined}
        onBlur={trigger === 'hover' ? hideTooltip : undefined}
        onClick={trigger === 'click' ? toggleTooltip : undefined}
      >
        {children}
      </div>
      
      {isVisible && (
        <>
          {position === 'center' && (
            <div 
              className={styles.tooltipOverlay}
              onClick={hideTooltip}
            />
          )}
          <div
            ref={tooltipRef}
            className={`${styles.tooltip} ${styles[position]}`}
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
            }}
          >
            <div className={styles.tooltipContent}>
              {content}
            </div>
            {position !== 'center' && (
              <div className={`${styles.tooltipArrow} ${styles[position]}`} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Tooltip;
