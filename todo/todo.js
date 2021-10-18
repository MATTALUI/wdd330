function Todo({ id, content, completed, }={}) {
  this.id = id || new Date().getTime();
  this.content = content;
  this.completed = completed || false;
}
