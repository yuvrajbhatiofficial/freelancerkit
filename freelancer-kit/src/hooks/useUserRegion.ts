import { useState, useEffect } from 'react';

export function useUserRegion() {
  const [isIndia, setIsIndia] = useState<boolean>(false);

  useEffect(() => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const locale = navigator.language;

      if (timezone === 'Asia/Calcutta' || timezone === 'Asia/Kolkata' || locale.includes('IN')) {
        setIsIndia(true);
      }
    } catch (e) {
      // Fallback to global
      setIsIndia(false);
    }
  }, []);

  const getPrice = () => {
    if (isIndia) return '₹299';
    return '$10';
  };

  const getPaymentLink = () => {
    // Return placeholder links since actual links were not provided
    if (isIndia) return 'https://rzp.io/l/placeholder_freelancekit';
    return 'https://buy.polar.sh/placeholder_freelancekit';
  };

  return { isIndia, getPrice, getPaymentLink };
}
