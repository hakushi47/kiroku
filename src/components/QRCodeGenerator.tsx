'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { CounselingSheet } from '@/lib/firebase';
import { Button } from './Button';

interface QRCodeGeneratorProps {
  sheet: CounselingSheet;
  baseUrl: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  sheet,
  baseUrl
}) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const sheetUrl = `${baseUrl}/sheet/${sheet.id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sheetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('クリップボードへのコピーに失敗:', error);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `kiroku-sheet-${sheet.id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">QRコード生成</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowQR(!showQR)}
            variant="secondary"
          >
            {showQR ? 'QRコードを隠す' : 'QRコードを表示'}
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="secondary"
          >
            {copied ? 'コピー完了！' : 'URLをコピー'}
          </Button>
        </div>

        {showQR && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border">
                <QRCode
                  id="qr-code-svg"
                  value={sheetUrl}
                  size={200}
                  level="H"
                />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                シートURL: {sheetUrl}
              </p>
              
              <Button
                onClick={downloadQR}
                variant="secondary"
              >
                QRコードをダウンロード
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">使用方法</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• QRコードを印刷して店舗に設置</li>
            <li>• お客様がスマートフォンでQRコードを読み取り</li>
            <li>• カウンセリングシートが表示される</li>
            <li>• 回答を入力して送信</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 