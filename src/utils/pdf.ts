function getViewerUrl(fileUrl: string) {
  const extension = fileUrl.split('.').pop()?.toLowerCase();

  if (!extension) return null;

  const encodedUrl = encodeURIComponent(fileUrl);

  switch (extension) {
    case 'pdf':
    case 'txt':
      return fileUrl; // open directly in iframe
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
      return `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
    default:
      return null;
  }
}
