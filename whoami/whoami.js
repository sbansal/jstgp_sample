exports.Whoami = function() {
  this.backstoppers = [];
}

exports.Whoami.prototype = {
  getStatus: function () {
    return 'not written';
  },
  getBackstoppers: function() {
    return this.backstoppers;
  },
  loadFakeBackstoppers: function() {
    this.backstoppers = [
        {name: "Jake Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"},
        {name: "Bob Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"},
        {name: "Steve Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"}]
  }
};