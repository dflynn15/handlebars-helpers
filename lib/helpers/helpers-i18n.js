/**
 * Handlebars Helpers: i18n, for localizing templates in multiple languages.
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// The module to be exported
var helpers = {


  /**
   * {{i18n}}
   * @author: Laurent Goderre <https://github.com/LaurentGoderrre>
   * @param  {String} context
   * @param  {Object} options
   * @return {String}
   * @example: <https://github.com/assemble/buttons> (See the "button-i18n" example)
   */
  i18n: function (context, options) {
    var dataRoot = options.hash.context || this,
        language = (typeof options.hash.language === "string" ? options.hash.language : dataRoot.language);

    if (typeof context !== "string") {
      throw "Key must be of type 'string'";
    }
    if (typeof language === "undefined") {
      throw "The 'language' parameter is not defined";
    }
    if (typeof dataRoot[language] === "undefined") {
      throw "No strings found for language '" + language + "'";
    }
    if (typeof dataRoot[language][context] === "undefined") {
      throw "No string for key '" + context + "' for language '" + language + "'";
    }
    return dataRoot[language][context];
  }
};


// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};
  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
