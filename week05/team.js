(() => {
  function Hike({ name, distance, difficulty, image, } = {}){
    this.name = name;
    this.distance = distance;
    this.difficulty = difficulty;
    this.image = image;
  }

  const renderHike = hike => {
    const list = document.querySelector('#hikes');
    const hikeEle = document.createElement('li');
    const template = document.querySelector('#hike-template');

    hikeEle.classList.add('hike');
    hikeEle.append(template.content.cloneNode(true));
    hikeEle.querySelector('.hike__name').innerHTML = hike.name;
    hikeEle.querySelector('.hike__difficulty').innerHTML = hike.difficulty;
    hikeEle.querySelector('.hike__distance').innerHTML = hike.distance;

    const hikeImg = hikeEle.querySelector('.hike__image');
    hikeImg.setAttribute('src', hike.image);

    list.appendChild(hikeEle);
  };

  const hikes = [
    { name: 'Bechler Falls', distance: 3, difficulty: 'Easy', image: 'https://picsum.photos/200/300' },
    { name: 'Teton Canyon', distance: 3, difficulty: 'Easy', image: 'https://picsum.photos/200/300' },
    { name: 'Denanda Falls', distance: 7, difficulty: 'Moderate', image: 'https://picsum.photos/200/300' },
  ].map(h => new Hike(h)).forEach(renderHike);
})();
