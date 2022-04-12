console.log('SFChronicle Popup Unlock is active.');
const sheet = document.createElement('style');
sheet.innerHTML = `
body {

}
.bc_header.bc_header {
  display: none !important;
}
.fancybox-overlay.fancybox-overlay {
  display: none !important;
}
html,
body,
.fancybox-lock.fancybox-lock,
.fancybox-lock.fancybox-lock body,
html body {
  overflow: auto !important;
  overflow-x: auto !important;
  overflow-y: auto !important;
  position: relative !important;
}
`;
document.body.appendChild(sheet);
let articleText = '';
let articleElement = null;
try {
  articleText = JSON.parse(
    document.querySelector('script[type="application/ld+json"]').text.trim()
  ).articleBody;
  articleElement = document.querySelector('main article').cloneNode(true);
  articleElement.classList.add('recovered');
  [...articleElement.querySelectorAll('picture')].forEach((pic) => {
    pic.classList.remove('deferred');
    pic.classList.add('fade-in');
    const img = pic.querySelector('img');
    img.src = img.getAttribute('data-src');
  });
} catch {
  console.log('Failed to preserve text');
}
const checker = window.setInterval(() => {
  if (articleText) {
    const article = document.querySelector('main article p.linkdisable');
    if (article) {
      console.log('Replace article body');
      article.textContent = articleText;

      console.log('Replace article with backup copy.');
      const mainArticle = document.querySelector('main article');
      mainArticle.parentElement.replaceChild(articleElement, mainArticle);

      window.clearInterval(checker);
    }
  }
}, 1000);

export {};
