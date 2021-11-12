(() => {
  const linkRegistry = [
    { url: './week01/index.html', label: 'Week 1 Notes' },
    { url: './week02/notes.html', label: 'Week 2 Notes' },
    { url: './week02/team.html', label: 'Week 2 Team Assignment' },
    { url: './week03/notes.html', label: 'Week 3 Notes' },
    { url: './week03/team.html', label: 'Week 3 Team Assignment' },
    { url: './week04/notes.html', label: 'Week 4 Notes' },
    { url: './week04/team.html', label: 'Week 4 Team Assignment' },
    { url: './week05/notes.html', label: 'Week 5 Notes' },
    { url: './week05/team.html', label: 'Week 5 Team Assignment (Hikes)' },
    { url: './todo/index.html', label: 'Todos Project' },
    { url: './week07/notes.html', label: 'Week 7 Notes' },
    { url: './week05/team.html', label: 'Week 7 Team Assignment (Hike Comments)' },
    { url: './week08/notes.html', label: 'Week 8 Notes' },
    { url: './week08/team.html', label: 'Week 8 Team Assignment' },
    { url: './week09/notes.html', label: 'Week 9 Notes' },
    { url: './week09/drums/team.html', label: 'Week 9 Team Assignment' },
    { url: './pokedex/index.html', label: 'Pokedex Project' },
    { url: './week10/notes.html', label: 'Week 10 Notes' },
    { url: './week10/drums/team.html', label: 'Week 10 Team Assignment' },
  ];
  const contentLinks = linkRegistry.map(link => `<li><a href="${link.url}">${link.label}</a></li>`).join('');

  document.querySelector('#contentList').innerHTML = contentLinks;
})();
