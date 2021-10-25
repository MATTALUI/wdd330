(() => {
  function Hike({ name, distance, difficulty, image, } = {}){
    this.name = name;
    this.distance = distance;
    this.difficulty = difficulty;
    this.image = image;
  }

  function Comment({ name, hike, type, date, body } = {}) {
    if (!name) throw new Error('Comments must have a "name" value.');
    if (!hike) throw new Error('Comments must have a "hike" value.');
    if (!body) throw new Error('Comments must have a "body" value.');
    this.name = name;
    this.hike = hike;
    this.date = date || new Date().toString();
    this.body = body;
    this.type = type || this.CommentTypes.UNKNOWN;
  }

  Comment.CommentTypes = {
    UNKNOWN: 'Unknown',
    HIKE: 'Hike',
  };

  Comment.getAllComments = function() {
    try {
      return JSON.parse(localStorage.getItem('GREATHIKES::COMMENTS')) || [];
    } catch(e) {
      return [];
    }
  };

  Comment.saveComment = function(comment) {
    const comments = Comment.getAllComments();
    comments.push(comment);

    localStorage.setItem('GREATHIKES::COMMENTS', JSON.stringify(comments));
  };

  Comment.newHikeComment = function(comment){
    return new Comment({
      ...comment,
      type: Comment.CommentTypes.HIKE,
    });
  };

  Comment.getCommentsForHike = function(hike) {
    return Comment.getAllComments().filter(c =>
      c.type === Comment.CommentTypes.HIKE && c.hike === hike.name
    );
  };

  const hikes = [
    { name: 'Bechler Falls', distance: 3, difficulty: 'Easy', image: '../assets/images/blecher.jpeg' },
    { name: 'Teton Canyon', distance: 3, difficulty: 'Easy', image: 'https://picsum.photos/300/200' },
    { name: 'Denanda Falls', distance: 7, difficulty: 'Moderate', image: 'https://picsum.photos/300/200' },
    { name: 'Matts Hike', distance: 7, difficulty: 'Moderate', image: 'https://picsum.photos/300/200' },
  ];
  console.log(Comment.getAllComments());

  const toggleHikeBody = event => {
    // document.querySelectorAll('.hike__body').forEach(ele => ele.classList.add('hidden'));
    event.target.closest('.hike').querySelector('.hike__body').classList.toggle('hidden');
  };

  const buildCommentEle = comment => {
    const commentEle = document.createElement('div');
    const template = document.querySelector('#comment-template');

    commentEle.classList.add('comment');
    commentEle.append(template.content.cloneNode(true));

    commentEle.querySelector('.comment__body').innerHTML = `"${comment.body}"`;
    commentEle.querySelector('.comment__name').innerHTML = comment.name;
    commentEle.querySelector('.comment__date').innerHTML = comment.date;

    return commentEle;
  };

  const submitComment = event => {
    event.preventDefault();

    const form = event.target.closest('.comment-form');
    const name = form.querySelector('.comment-form__name').value;
    const body = form.querySelector('.comment-form__body').value;
    const hike = form.querySelector('.comment-form__hike').value;

    if (!!name && !!hike && !!body) {
      const comment = Comment.newHikeComment({
        hike,
        body,
        name,
      });

      // Reset the form values
      form.querySelector('.comment-form__name').value = null;
      form.querySelector('.comment-form__body').value = null;

      Comment.saveComment(comment);
      event.target.closest('.hike').querySelector('.hike__comments').appendChild(buildCommentEle(comment));
    }
  };

  const renderHike = hike => {
    const list = document.querySelector('#hikes');
    const hikeEle = document.createElement('li');
    const template = document.querySelector('#hike-template');

    // Build Hike Ele
    hikeEle.classList.add('hike');
    hikeEle.append(template.content.cloneNode(true));
    hikeEle.querySelector('.hike__name').innerHTML = hike.name;
    hikeEle.querySelector('.hike__difficulty').innerHTML = hike.difficulty;
    hikeEle.querySelector('.hike__distance').innerHTML = hike.distance;

    // Build Comment Stuff
    hikeEle.querySelector('.comment-form__hike').value = hike.name;
    hikeEle.querySelector('.comment-form__hike').value = hike.name;
    Comment.getCommentsForHike(hike).map(buildCommentEle).forEach(commentEle => {
      hikeEle.querySelector('.hike__comments').appendChild(commentEle);
    });

    // hikeEle.querySelector('.hike__comments').innerHTML = Comment.getCommentsForHike(hike).map(c => buildCommentEle(c).toString()).join('');

    // Add Event Listeners
    hikeEle.querySelector('.hike__name').addEventListener('click', toggleHikeBody);
    hikeEle.querySelector('.comment-form__submit').addEventListener('click', submitComment);

    const hikeImg = hikeEle.querySelector('.hike__image');
    hikeImg.setAttribute('src', hike.image);

    list.appendChild(hikeEle);
  };

  hikes.map(h => new Hike(h)).forEach(renderHike);
})();
