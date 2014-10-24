
export default function(route, options) {

  if(!route || !options || !options.redirect) {
    return;
  }

  route.reopen({
      beforeModel: function() {
        this.replaceWith(options.redirect);
      }
  });
};
