(function($) { 'use strict';

  // Class
  var HSInput = function($el, options) {
    if(!$el.length) {
      return;
    }

    this.$el = $el;
    this.events = $({});
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

  HSInput.prototype.isBlank = function() {
    var value = this.$input.val();
    return value.length === 0;
  };

  HSInput.prototype.isValid = function() {
    var value = this.$input.val();
    return this.options.validation.validate(value);
  };

  HSInput.prototype.validate = function() {
    if(!this.options.validation || !this.options.validation.validate) {
      return false;
    }

    if(typeof this.options.validation.validate !== 'function') {
      return false;
    }

    if(this.isBlank()) {
      this.events.trigger('hs-input:validation:reset');
      return;
    }

    if(this.isValid()) {
      this.events.trigger('hs-input:validation:success');
    } else {
      this.events.trigger('hs-input:validation:error');
    }
  };

  //
  // Rendering
  //
  HSInput.prototype.renderSuccess = function(message) {
    message = this.options.validation.success ? this.options.validation.success : message;

    if(!message) {
      message = 'Success';
    }

    this.$validationMessage.show();
    this.$validationMessage.html(message);

    this.$validationMessage
      .removeClass('is-danger')
      .addClass('is-success');

    this.$input
      .removeClass('is-danger')
      .addClass('is-success');
  };

  HSInput.prototype.renderError = function(message) {
    message = this.options.validation.error ? this.options.validation.error : message;

    if(!message) {
      message = 'Error';
    }

    this.$validationMessage.show();
    this.$validationMessage.html(message);

    this.$validationMessage
      .removeClass('is-success')
      .addClass('is-danger');

    this.$input
      .removeClass('is-success')
      .addClass('is-danger');
  };

  HSInput.prototype.renderReset = function() {
    this.$validationMessage
      .hide()
      .html('');

    if(this.isBlank()) {
      this.$input
        .removeClass('is-success')
        .removeClass('is-danger');
    }
  };

  //
  // Actions
  //

  HSInput.prototype.actions = function() {
    var _this = this;

    this.$input.on('input focus change', this.validate.bind(this));
    this.$input.on('blur', this.renderReset.bind(this));

    this.events.on('hs-input:validation:success', this.renderSuccess.bind(this));
    this.events.on('hs-input:validation:error', this.renderError.bind(this));
    this.events.on('hs-input:validation:reset', this.renderReset.bind(this));
  };

  // Exporting
  window.HelpscoutSeed.components.HSInput = HSInput;
})(jQuery);
