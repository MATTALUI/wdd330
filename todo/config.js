function Config() {
  const MODES = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETE: 'Completed',
  };

  this.init = function(options={}) {
      this.mode = options.mode || MODES.ALL;
  };

  this.modes = function() {
    // Spread this bad boy in in order to guarantee immutability;
    return { ...MODES };
  };

  this.init();
}
