(() => {
  const linkRegistry = [
    { url: '/week01/index.html', label: 'Week 1 Notes' },
  ];
  const contentLinks = linkRegistry.map(link => `<li><a href="${link.url}">${link.label}</a></li>`);

  document.querySelector('#contentList').innerHTML = contentLinks;
})();
