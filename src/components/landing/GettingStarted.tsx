import React from 'react';

export default function GettingStarted() {
  const steps = [
    {
      number: "1",
      title: "アカウント作成",
      description: "無料でアカウントを作成し、すぐに使い始められます"
    },
    {
      number: "2",
      title: "シート作成",
      description: "カウンセリングシートを作成し、QRコードを生成"
    },
    {
      number: "3",
      title: "サービス向上",
      description: "お客様の声を活用してサービス品質を向上"
    }
  ];

  return (
    <section className="py-16 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            3ステップで始められます
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">{step.title}</h3>
              <p className="text-primary-dark">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 