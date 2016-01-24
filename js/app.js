(function($) { 'use strict';

  window.APP = {};

  var $input = $('[data-component="hs-input"]');
  var options = {
    validation: {
      validate: function(value) {
        return value === 'POTATO';
      },
      error: 'MUST BE "POTATO"',
      success: 'Yay! Thanks <3'
    }
  };

  APP.potatoInput = new window.HelpscoutSeed.components.HSInput($input, options);

})(jQuery);
