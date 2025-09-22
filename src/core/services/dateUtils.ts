// Date formatting utilities

/**
 * Formats a date string to European format (DD.MM.YYYY HH:MM)
 * @param dateString - ISO date string
 * @returns Formatted date string in European format
 */
export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Formats a date string to European date only (DD.MM.YYYY)
 * @param dateString - ISO date string
 * @returns Formatted date string in European format (date only)
 */
export const formatDateOnly = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Formats a date string to European time only (HH:MM)
 * @param dateString - ISO date string
 * @returns Formatted time string in European format (time only)
 */
export const formatTimeOnly = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Formats a date string to European time with seconds (HH:MM:SS)
 * @param dateString - ISO date string
 * @returns Formatted time string in European format with seconds
 */
export const formatTimeWithSeconds = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Error formatting time with seconds:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Gets relative time (e.g., "vor 2 Stunden", "vor 3 Tagen")
 * @param dateString - ISO date string
 * @returns Relative time string in German
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'gerade eben';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return dateString;
  }
};
