(function($) { 'use strict';

  window.APP = {
    potatoInput: []
  };

  var HSInput = window.HelpscoutSeed.components.HSInput;

  var $input = $('[data-component="hs-input"]');
  var options = {
    validation: {
      validate: function(value) {
        return value === 'POTATO';
      },
      error: 'Answer must be "POTATO"',
      success: 'Yay! Thanks <3'
    }
  };

  $input.each(function() {
    var $this = $(this);
    var inputComponent = new HSInput($this, options);
    window.APP.potatoInput.push(inputComponent);
  });

})(jQuery);
