import {
  FEATURED_BLUEPRINT,
  UPCOMING_BLUEPRINTS,
  INITIAL_COMMENTS,
} from '../data/blueprints';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateStandaloneHtml(): string {
  const sectionsHtml = FEATURED_BLUEPRINT.sections
    .map(
      (sec) => `
      <section id="${escapeHtml(sec.id)}" class="scroll-mt-24">
        <div class="flex items-baseline gap-3 mb-3">
          <span class="font-mono text-sm font-semibold text-[#00F0FF]">${escapeHtml(sec.index)}.</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-50">${escapeHtml(sec.title)}</h3>
        </div>
        <p class="text-sm sm:text-base font-medium text-slate-300 mb-5 leading-relaxed">${escapeHtml(sec.lead)}</p>
        <div class="space-y-4 text-slate-200 leading-relaxed">
          ${sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>
        ${
          sec.pullQuote
            ? `<blockquote class="my-8 py-5 border-y border-slate-800 text-lg font-medium text-slate-100 italic">“${escapeHtml(sec.pullQuote)}”</blockquote>`
            : ''
        }
        ${
          sec.highlights
            ? `<div class="mt-6 grid grid-cols-1 gap-4">${sec.highlights
                .map(
                  (h) =>
                    `<div class="bg-[#111827] border border-slate-800 rounded-xl p-5"><h4 class="font-semibold text-[#00F0FF] mb-1">${escapeHtml(h.title)}</h4><p class="text-sm text-slate-300 leading-relaxed">${escapeHtml(h.detail)}</p></div>`
                )
                .join('')}</div>`
            : ''
        }
      </section>`
    )
    .join('');

  const metricsHtml = FEATURED_BLUEPRINT.metrics
    .map(
      (m) => `
      <div class="bg-[#111827] border border-slate-800 rounded-xl p-5">
        <div class="text-xs text-slate-400 mb-2">${escapeHtml(m.label)}</div>
        <div class="flex items-baseline gap-1.5 mb-1">
          <span class="font-mono text-2xl font-semibold text-slate-50">${escapeHtml(m.value)}</span>
          <span class="font-mono text-xs text-[#00F0FF] uppercase">${escapeHtml(m.unit)}</span>
        </div>
        <p class="text-xs text-slate-400">${escapeHtml(m.context)}</p>
      </div>`
    )
    .join('');

  const upcomingHtml = UPCOMING_BLUEPRINTS.map(
    (item) => `
      <article data-category="${escapeHtml(item.category)}" class="upcoming-card bg-[#111827] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
            <span class="font-mono text-[#00F0FF]">#${escapeHtml(item.issueNumber)}</span>
            <span>·</span>
            <span>${escapeHtml(item.categoryLabel)}</span>
            <span>·</span>
            <span class="text-slate-300">Sắp ra mắt</span>
          </div>
          <h3 class="text-lg font-bold text-slate-100 leading-snug mb-3">${escapeHtml(item.title)}</h3>
          <p class="text-sm text-slate-300 leading-relaxed mb-5">${escapeHtml(item.summary)}</p>
        </div>
        <div class="pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">${escapeHtml(item.estimatedRelease)}</div>
      </article>`
  ).join('');

  const tiersJson = JSON.stringify(FEATURED_BLUEPRINT.tiers);
  const initialCommentsJson = JSON.stringify(INITIAL_COMMENTS);

  return `<!DOCTYPE html>
<html lang="vi" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HORIZON BLUEPRINT</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #0B0F19; color: #E2E8F0; }
    h1, h2, h3, h4 { font-family: 'Outfit', system-ui, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    body.focus-mode #site-header,
    body.focus-mode #hero-section,
    body.focus-mode #upcoming-section,
    body.focus-mode #about-section,
    body.focus-mode #site-footer { display: none; }
    body.focus-mode #focus-bar { display: flex; }
    body.focus-mode #article-wrapper { max-width: 48rem; margin: 0 auto; }
  </style>
</head>
<body class="bg-[#0B0F19] text-[#E2E8F0] antialiased">
  <div id="focus-bar" class="hidden sticky top-0 z-50 bg-[#080B13]/95 backdrop-blur border-b border-slate-800 px-4 sm:px-6 h-14 items-center justify-between">
    <div class="flex items-center gap-3 min-w-0">
      <span class="font-mono text-xs text-[#00F0FF]">Tập #01</span>
      <span class="text-sm text-slate-300 truncate">${escapeHtml(FEATURED_BLUEPRINT.title)}</span>
    </div>
    <button onclick="toggleFocusMode()" class="px-3.5 py-1.5 text-xs font-semibold bg-[#111827] border border-slate-700 rounded-lg text-slate-100 hover:border-[#00F0FF] cursor-pointer">Thoát tập trung (Esc)</button>
  </div>

  <header id="site-header" class="sticky top-0 z-40 bg-[#0B0F19]/92 backdrop-blur border-b border-slate-800">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
      <a href="#hero-section" class="text-lg font-bold text-slate-100 whitespace-nowrap">HORIZON BLUEPRINT</a>
      <nav class="hidden md:flex items-center gap-6 text-sm text-slate-300">
        <a href="#hero-section" onclick="filterCards('all')" class="hover:text-[#00F0FF]">Trang chủ</a>
        <a href="#upcoming-section" onclick="filterCards('space-quantum')" class="hover:text-[#00F0FF]">Vũ trụ &amp; Lượng tử</a>
        <a href="#upcoming-section" onclick="filterCards('ai-robotics')" class="hover:text-[#00F0FF]">AI &amp; Robot</a>
        <a href="#about-section" class="hover:text-[#00F0FF]">Giới thiệu</a>
      </nav>
      <button onclick="toggleFocusMode()" class="px-4 py-2 text-xs font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg cursor-pointer whitespace-nowrap">Chế độ tập trung</button>
    </div>
  </header>

  <section id="hero-section" class="border-b border-slate-800">
    <div class="border-b border-slate-800/70 bg-[#0D121E]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between gap-2 text-xs">
        <div><span class="font-mono font-semibold text-[#00F0FF]">HORIZON BLUEPRINT</span> · Lưu trữ những bản thiết kế cho ngày mai</div>
        <div class="font-mono text-slate-400">Hồ sơ #01 · 2026</div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
        <span class="font-mono text-[#00F0FF]">Bài viết #01</span> · <span>${escapeHtml(FEATURED_BLUEPRINT.categoryLabel)}</span> · <span>${escapeHtml(FEATURED_BLUEPRINT.readTime)}</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold text-slate-50 leading-tight max-w-4xl mb-5">${escapeHtml(FEATURED_BLUEPRINT.title)}</h1>
      <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">${escapeHtml(FEATURED_BLUEPRINT.summary)}</p>
      <div class="flex flex-wrap gap-3 mb-10">
        <a href="#featured-article" class="px-6 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg">Đọc toàn bộ bản thiết kế</a>
        <button onclick="toggleFocusMode()" class="px-5 py-3 text-sm font-medium text-slate-100 bg-[#111827] border border-slate-700 hover:border-[#7000FF] rounded-lg cursor-pointer">Chế độ đọc tập trung</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">${metricsHtml}</div>
    </div>
  </section>

  <main id="featured-article" class="border-b border-slate-800">
    <div id="article-wrapper" class="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">
      <div class="bg-[#111827] border border-slate-800 rounded-xl p-5">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 class="font-bold text-slate-100">Sơ đồ Tương tác 3 Tầng Kiến trúc</h3>
          <span class="font-mono text-xs text-[#00F0FF]">Interactive Specs</span>
        </div>
        <div id="tier-tabs" class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4"></div>
        <div id="tier-panel" class="bg-[#0B0F19] border border-slate-800 rounded-lg p-4 text-sm text-slate-300"></div>
      </div>
      ${sectionsHtml}
    </div>
  </main>

  <section id="upcoming-section" class="border-b border-slate-800">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p class="font-mono text-xs text-[#00F0FF] mb-1">Hồ sơ Sắp Ra Mắt</p>
          <h2 class="text-2xl font-bold text-slate-50">Các Bản Thiết Kế Tiếp Theo</h2>
        </div>
        <div class="flex flex-wrap gap-2">
          <button onclick="filterCards('all')" class="px-3 py-1.5 text-xs bg-[#111827] border border-slate-700 rounded-lg cursor-pointer hover:border-[#00F0FF]">Tất cả</button>
          <button onclick="filterCards('space-quantum')" class="px-3 py-1.5 text-xs bg-[#111827] border border-slate-700 rounded-lg cursor-pointer hover:border-[#00F0FF]">Vũ trụ &amp; Lượng tử</button>
          <button onclick="filterCards('ai-robotics')" class="px-3 py-1.5 text-xs bg-[#111827] border border-slate-700 rounded-lg cursor-pointer hover:border-[#00F0FF]">AI &amp; Robot</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${upcomingHtml}</div>
    </div>
  </section>

  <section id="discussion-section" class="border-b border-slate-800">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h2 class="text-2xl font-bold text-slate-50 mb-6">Thảo luận &amp; Góp ý Kiến trúc</h2>
      <form id="comment-form" class="bg-[#111827] border border-slate-800 rounded-xl p-5 mb-8 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input id="c-author" type="text" placeholder="Tên của bạn *" class="px-3.5 py-2.5 text-sm bg-[#0B0F19] border border-slate-800 rounded-lg text-slate-100 focus:border-[#00F0FF] focus:outline-none" />
          <input id="c-role" type="text" placeholder="Chuyên môn (không bắt buộc)" class="px-3.5 py-2.5 text-sm bg-[#0B0F19] border border-slate-800 rounded-lg text-slate-100 focus:border-[#00F0FF] focus:outline-none" />
        </div>
        <textarea id="c-content" rows="3" placeholder="Nhập góp ý kiến trúc của bạn... *" class="w-full px-3.5 py-2.5 text-sm bg-[#0B0F19] border border-slate-800 rounded-lg text-slate-100 focus:border-[#00F0FF] focus:outline-none"></textarea>
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-400">Lưu tự động qua localStorage</span>
          <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg cursor-pointer">Gửi góp ý</button>
        </div>
      </form>
      <div id="comment-list" class="space-y-4"></div>
    </div>
  </section>

  <section id="about-section" class="border-b border-slate-800">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p class="font-mono text-xs text-[#00F0FF] mb-2">Giới thiệu Dự án</p>
      <h2 class="text-2xl font-bold text-slate-50 mb-4">HORIZON BLUEPRINT</h2>
      <p class="text-slate-300 leading-relaxed">Lưu trữ những bản thiết kế cho ngày mai — ấn phẩm biên tập độc lập ghi chép các kiến trúc công nghệ tiên phong trong điện toán lượng tử quỹ đạo, tự hành không gian sâu và hệ thống robot phân tán.</p>
    </div>
  </section>

  <footer id="site-footer" class="py-8 text-center text-xs text-slate-500">
    HORIZON BLUEPRINT — Lưu trữ những bản thiết kế cho ngày mai
  </footer>

  <script>
    const tiers = ${tiersJson};
    let activeTier = tiers[0].id;
    function renderTiers() {
      const tabs = document.getElementById('tier-tabs');
      const panel = document.getElementById('tier-panel');
      tabs.innerHTML = tiers.map(t => \`
        <button onclick="selectTier('\${t.id}')" class="p-3 rounded-lg border text-left text-xs font-medium cursor-pointer \${t.id === activeTier ? 'border-[#00F0FF] bg-[#0D1526] text-slate-50' : 'border-slate-800 bg-[#0B0F19] text-slate-400'}">
          <div class="font-mono text-[#00F0FF] mb-1">\${t.tierLabel}</div>
          <div>\${t.name}</div>
        </button>
      \`).join('');
      const current = tiers.find(t => t.id === activeTier) || tiers[0];
      panel.innerHTML = \`
        <div class="font-semibold text-slate-100 mb-1">\${current.name}</div>
        <p class="text-xs text-slate-400 mb-3">\${current.altitudeOrZone} · \${current.linkProtocol}</p>
        <p class="leading-relaxed">\${current.engineeringSummary}</p>
      \`;
    }
    window.selectTier = function(id) { activeTier = id; renderTiers(); };
    renderTiers();

    window.toggleFocusMode = function() {
      document.body.classList.toggle('focus-mode');
      window.scrollTo({ top: document.getElementById('featured-article').offsetTop, behavior: 'smooth' });
    };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('focus-mode')) toggleFocusMode();
    });

    window.filterCards = function(cat) {
      document.querySelectorAll('.upcoming-card').forEach(el => {
        el.style.display = (cat === 'all' || el.dataset.category === cat) ? 'flex' : 'none';
      });
    };

    const STORAGE_KEY = 'horizon_blueprint_comments_v1';
    const seedComments = ${initialCommentsJson};
    function getComments() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : seedComments;
      } catch { return seedComments; }
    }
    function renderComments() {
      const list = document.getElementById('comment-list');
      const items = getComments();
      list.innerHTML = items.map(c => \`
        <article class="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <div class="flex justify-between text-xs text-slate-400 mb-2">
            <div><strong class="text-slate-100 text-sm">\${c.author}</strong> · \${c.role || 'Độc giả'}</div>
            <span class="font-mono">\${c.createdAt}</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">\${c.content}</p>
        </article>
      \`).join('');
    }
    document.getElementById('comment-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const author = document.getElementById('c-author').value.trim();
      const role = document.getElementById('c-role').value.trim();
      const content = document.getElementById('c-content').value.trim();
      if (!author || !content) return;
      const items = getComments();
      const now = new Date();
      const ts = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear() + ' · ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      items.unshift({ id: 'c-' + Date.now(), author, role: role || 'Độc giả', content, createdAt: ts, likes: 0 });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      e.target.reset();
      renderComments();
    });
    renderComments();
  </script>
</body>
</html>`;
}
