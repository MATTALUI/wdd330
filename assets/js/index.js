(() => {
  const linkRegistry = [
    { url: './week01/index.html', label: 'Week 1 Notes' },
    { url: './week02/notes.html', label: 'Week 2 Notes' },
    { url: './week02/team.html', label: 'Week 2 Team Assignment' },
    { url: './week03/notes.html', label: 'Week 3 Notes' },
    { url: './week03/team.html', label: 'Week 3 Team Assignment' },
    { url: './week04/notes.html', label: 'Week 4 Notes' },
  ];
  const contentLinks = linkRegistry.map(link => `<li><a href="${link.url}">${link.label}</a></li>`).join('');

  document.querySelector('#contentList').innerHTML = contentLinks;
})();
