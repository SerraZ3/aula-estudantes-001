import React from 'react';
import { Card } from 'antd';

const PdfViewer = ({ url }: { url: string }) => {
  return (
    <Card title="Visualizador de PDF" style={{ height: '80vh' }}>
      <iframe src={url} title="PDF" width="100%" height="100%" style={{ border: 'none' }} />
    </Card>
  );
};

export default PdfViewer;
