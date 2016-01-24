(function($) { 'use strict';

  // Class
  var HSInput = function($el, options) {
    if(!$el.length) {
      return;
    }

    this.$el = $el;
    this.options = {
      validation: false
    };

    if(typeof options === 'object') {
      $.extend(this.options, options);
    }

    this.initialize();
  };

  HSInput.prototype.initialize = function() {
    console.log('HSInput created.');

    this.$input = this.$el.find('.c-form-control');
    this.setupValidation();

    // Sets up actions
    this.actions();
  };

  HSInput.prototype.actions = function() {
    var _this = this;
    this.$input.on('input', function() {
      _this.validate();
    });
  };

  //
  // Validation
  //
  HSInput.prototype.setupValidation = function() {
    if(!this.options.validation) {
      return false;
    }

    this.$validationMessage = $('<div class="c-form-validation__message"></div>');
    this.$el.append(this.$validationMessage);
    this.$validationMessage.hide();
  };

  HSInput.prototype.validate = function() {
    if(!this.options.validation || !this.options.validation.validate) {
      return false;
    }

    if(typeof this.options.validation.validate !== 'function') {
      return false;
    }

    var value = this.$input.val();

    if(this.options.validation.validate(value)) {
      this.validationSuccess();
    } else {
      this.validationError();
    }
  };

  HSInput.prototype.validationSuccess = function() {
    var message = 'Success';

    if(this.options.validation.success) {
      message = this.options.validation.success;
    }

    this.renderValidation(message);
  };

  HSInput.prototype.validationError = function() {
    var message = 'Somethings not right.…';

    if(this.options.validation.error) {
      message = this.options.validation.error;
    }

    this.renderValidation(message);
  };

  //
  // Rendering
  //
  HSInput.prototype.renderValidation = function(message) {
    if(!message) {
      return;
    }

    this.$validationMessage.show();
    this.$validationMessage.html(message);
  };

  // Exporting
  window.HelpscoutSeed.components.HSInput = HSInput;
})(jQuery);
