import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/standaloneHtmlExport';

export function AboutSection() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'horizon-blueprint-index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-slate-800/80 bg-[#0D121E]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono text-xs text-[#00F0FF]">
              Tuyên ngôn Biên tập · HORIZON BLUEPRINT
            </p>
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight headline-balance"
            >
              Về Dự án HORIZON BLUEPRINT
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-slate-100">HORIZON BLUEPRINT</strong> là chuyên trang biên tập công nghệ viễn tưởng ứng dụng, hoạt động với sứ mệnh{' '}
              <span className="text-[#00F0FF]">“Lưu trữ những bản thiết kế cho ngày mai”</span>. Thay vì dừng lại ở tin tức ngắn hạn, mỗi hồ sơ thiết kế đi sâu vào kiến trúc hệ thống, đánh đổi vật lý, và các bài toán kỹ thuật cần giải quyết để biến ý tưởng tương lai thành hiện thực khả thi.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="font-display text-base font-semibold text-slate-100">
              Lưu trữ & Chạy Độc Lập
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Bạn có thể tải xuống toàn bộ ấn phẩm số #01 dưới dạng một file <code className="font-mono text-xs text-[#00F0FF]">index.html</code> duy nhất (tích hợp Tailwind CSS CDN, Chế độ tập trung và bình luận localStorage) để mở trực tiếp trên trình duyệt bất cứ lúc nào.
            </p>
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Đã tải xuống index.html</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Tải file HTML độc lập</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
