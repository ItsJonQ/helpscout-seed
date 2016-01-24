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

    // TODO: Add state
    // In the DOM, the component appears to be aware of state. That
    // is because the component re-renders everytime it is interacted
    // with. In isolation, this isn't too bad. However, this is
    // unnecessarily expensive.
    //
    // The DOM element should ONLY re-render once the state
    // of the component has changed.
    //
    // e.g.
    // invalid -> valid

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

    this.$validationIcon = $('<div class="c-form-validation__icon"></div>');
    this.$el.append(this.$validationIcon);
    this.$validationIcon.hide();
  };


  // Computed
  HSInput.prototype.value = function(val) {
    if(val) {
      this.$input.val(val);
      this.events.trigger('hs-input:validation:validate');
    }

    return this.$input.val();
  };

  HSInput.prototype.isBlank = function() {
    var value = this.value();
    return value.length === 0;
  };

  HSInput.prototype.isValid = function() {
    var value = this.value();
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

    this.$validationMessage
      .html(message)
      .removeClass('is-danger')
      .addClass('is-success')
      .show();

    this.$input
      .removeClass('is-danger')
      .addClass('is-success');

    this.$validationIcon
      .html('<i class="icon icon--lg ion-ios-checkmark-outline u-text-success"></i>')
      .show();
  };

  HSInput.prototype.renderError = function(message) {
    message = this.options.validation.error ? this.options.validation.error : message;

    if(!message) {
      message = 'Error';
    }

    this.$validationMessage
      .html(message)
      .removeClass('is-success')
      .addClass('is-danger')
      .show();

    this.$input
      .removeClass('is-success')
      .addClass('is-danger');

    this.$validationIcon
      .html('<i class="icon icon--lg ion-ios-close-outline u-text-danger"></i>')
      .show();
  };

  HSInput.prototype.renderReset = function() {
    this.$validationMessage
      .hide()
      .html('');

    if(this.isBlank()) {
      this.$input
        .removeClass('is-success')
        .removeClass('is-danger');

      this.$validationIcon
        .hide()
        .html('');
    }
  };

  //
  // Actions
  //

  HSInput.prototype.actions = function() {
    var _this = this;

    this.$input.on('input focus change', this.validate.bind(this));
    this.$input.on('blur', this.renderReset.bind(this));

    this.events.on('hs-input:validation:validate', this.validate.bind(this));

    this.events.on('hs-input:validation:success', this.renderSuccess.bind(this));
    this.events.on('hs-input:validation:error', this.renderError.bind(this));
    this.events.on('hs-input:validation:reset', this.renderReset.bind(this));
  };

  // Exporting
  window.HelpscoutSeed.components.HSInput = HSInput;
})(jQuery);
