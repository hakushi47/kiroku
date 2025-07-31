import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mさん",
      profession: "エステティシャン",
      content: "Kirokuのおかげで、お客様のご要望を効率的に記録できるようになりました。QRコード機能も便利で、お客様も使いやすいと言ってくださいます。"
    },
    {
      name: "Aさん",
      profession: "セラピスト",
      content: "プライバシーがしっかり保護されているので安心して使えます。記録が整理されて、サービス向上に役立っています。"
    },
    {
      name: "Yさん",
      profession: "コンパニオン",
      content: "モバイル対応で外出先でも使えるのが便利です。お客様の声をリアルタイムで確認できて、サービス改善に活用しています。"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            ユーザーの声
          </h2>
          <p className="text-lg text-primary-dark">
            実際にKirokuを使用している方々からの感想
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex text-primary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-primary-dark mb-4">
                "{testimonial.content}"
              </p>
              <div className="text-sm text-primary-dark">
                <strong>{testimonial.name}</strong> {testimonial.profession}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 