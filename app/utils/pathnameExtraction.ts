export const getFormattedPathname = (path: string) => {
    const segments = path.replace(/^\/+|\/+$/g, '').split('/');
  
    if (segments.length === 0 || !segments[segments.length - 1]) {
      return '';
    }
  
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
  