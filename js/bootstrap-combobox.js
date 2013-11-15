/* =============================================================
 * bootstrap-combobox.js v1.1.4
 * =============================================================
 * Copyright 2012 Daniel Farrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ) {

 "use strict";

  var Combobox = function ( element, options ) {
    this.options = $.extend({}, $.fn.combobox.defaults, options)
    this.$source = $(element)
    this.$container = this.setup()
    this.$element = this.$container.find('input[type=text]')
    this.$target = this.$container.find('input[type=hidden]')
    this.$button = this.$container.find('.dropdown-toggle')

    this.$menu = $(this.options.menu).appendTo('body')
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.shown = false
    this.selected = false

    this.refresh()
    this.transferAttributes()
    this.listen()
    this.getdataval()
  }

  /* NOTE: COMBOBOX EXTENDS BOOTSTRAP-TYPEAHEAD.js
     ========================================== */

  Combobox.prototype = $.extend({}, $.fn.typeahead.Constructor.prototype, {

    constructor: Combobox

  , setup: function () {
      var combobox = $(this.options.template)
      this.$source.before(combobox)
      this.$source.hide()
      return combobox
    }

  , parse: function () {
      var that = this
        , map = {}
        , mapi = {}
        , source = []
        , selected = false
        , selectedValue = ''
      this.$source.find('option').each(function() {
        var option = $(this)
        if (option.val() === '') {
          that.options.placeholder = option.text()
          return
        }
        map[option.val()] = option.text()
        mapi[option.text()] = option.val()
        source.push(option.text())
        if (option.prop('selected')) {
          selected = option.text()
          selectedValue = option.val() ? option.val() : option.text()
        }
      })
      this.map = map
      this.mapi = mapi
      if (selected) {
        this.$element.val(selected)
        this.$target.val(selectedValue)
        this.$container.addClass('combobox-selected')
        this.selected = true
      }
      return source
    }

  , transferAttributes: function() {
    this.options.placeholder = this.$source.attr('data-placeholder') || this.options.placeholder
    this.$element.attr('placeholder', this.options.placeholder)
    this.$target.prop('name', this.$source.prop('name'))
    this.$target.val(this.$source.val())
    this.$source.removeAttr('name')  // Remove from source otherwise form will pass parameter twice.
    this.$element.attr('required', this.$source.attr('required'))
    this.$element.attr('rel', this.$source.attr('rel'))
    this.$element.attr('title', this.$source.attr('title'))
    if (!this.options.freeform) {
      this.$element.attr('class', this.$source.attr('class'))
    }
    this.$element.attr('tabindex', this.$source.attr('tabindex'))
    this.$source.removeAttr('tabindex')
  }

  , toggle: function () {
    if (this.$container.hasClass('combobox-selected')) {
      this.clearTarget()
      this.triggerChange()
      this.clearElement()
      this.lookup()
    } else {
      if (this.shown) {
        this.hide()
      } else {
        this.clearElement()
        this.lookup()
      }
    }
  }

  , clearElement: function () {
    if (!this.options.freeform) {
      this.$element.val('').focus()
    }
    else {
      this.$element.focus()
    }
  }

  , clearTarget: function () {
    this.$source.val('')

    if (!this.options.freeform) {
      this.$target.val('')
    }

    this.$container.removeClass('combobox-selected')

    this.selected = false
  }

  , triggerChange: function () {
    this.$source.trigger('change')
  }

  , refresh: function () {
    this.source = this.parse()
    this.options.items = this.source.length
  }

  // modified typeahead function adding container and target handling
  , select: function (tab) {
    if (!tab) {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(this.updater(val)).trigger('change')
      this.$source.val(this.map[val]).trigger('change')
      this.$target.val(this.map[val]).trigger('change')
    }

    this.$container.addClass('combobox-selected')

    this.selected = (!this.options.freeform)

    return this.hide()
  }

  // modified typeahead function removing the blank handling and source function handling
  , lookup: function (event) {
      if (!this.options.freeform) {
        this.query = this.$element.val()
      }
      else {
        this.query = this.$element.val()

        var check = this.matches(this.query)

        if (!check) {
          this.query = ''
        }
      }

      return this.process(this.source)
    }

  , matches: function (item) {
      for(var i in this.source) {
        var pos = this.source[i].toLowerCase().indexOf(item.trim().toLowerCase())
        if (pos != -1) {
          return true
        }
      }

      return false
    }

  // modified typeahead function adding button handling and remove mouseleave
  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))

      this.$button
        .on('click', $.proxy(this.toggle, this))
    }

  , getdataval: function () {
      // get passed-in combobox data
      var val = this.$source.attr('data-value')

      if (this.options.freeform) {
        // clear hidden field
        this.$target.val('').trigger('change')

        if (this.map[val]) {
          this.$element.val(this.map[val])
        }
        else {
          this.$element.val(val)
        }
      }

      if (val !== '' && val !== undefined) {
        this.$source.val(val).trigger('change')
        this.$target.val(val).trigger('change')
      }
    }

  // modified typeahead function to clear on type and prevent on moving around
  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
          if (!this.shown) this.lookup() // open dropdown on down arrow
          break
        case 39: // right arrow
        case 38: // up arrow
        case 37: // left arrow
        case 36: // home
        case 35: // end
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
          if (this.options.freeform) {
            if (!this.shown) return
            this.select(true)
            break
          }
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.clearTarget()
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  // modified typeahead function to force a match and add a delay on hide
  , blur: function (e) {
      var that = this
      this.focused = false
      var val = this.$element.val()

      if (val !== '') {
        if (!this.selected) {
          // only override user's data if freeform option is not set
          if (!this.options.freeform) {
            this.$element.val('')
            this.$source.val('').trigger('change')
            this.$target.val('').trigger('change')
          }
          else {
            this.$source.val(val).trigger('change')
            this.$target.val(val).trigger('change')
          }
        }
        else {
          if (this.options.freeform) {
            this.$target.val(this.map[val]).trigger('change')
          }
          else {
            if (!this.options.keeponblur) {
              this.$element.val('')
            }

            this.$target.val(this.mapi[val]).trigger('change')
          }
        }
      }

      this.$container.addClass('combobox-selected')

      if (!this.mousedover && this.shown) setTimeout(function () { that.hide() }, 200)
    }

  // modified typeahead function to not hide
  , mouseleave: function (e) {
      this.mousedover = false
    }
  })

  /* COMBOBOX PLUGIN DEFINITION
   * =========================== */

  $.fn.combobox = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('combobox')
        , options = typeof option == 'object' && option
      if(!data) $this.data('combobox', (data = new Combobox(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.combobox.defaults = {
  template: '<div class="combobox-container"><input type="hidden" /><input type="text" autocomplete="off" /><span class="add-on btn dropdown-toggle" data-dropdown="dropdown"><span class="caret"/><span class="combobox-clear"><i class="icon-remove"/></span></span></div>'
    , menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.combobox.Constructor = Combobox

}( window.jQuery );
