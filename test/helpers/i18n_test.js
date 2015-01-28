/**
 * Handlebars Helpers Tests: i18n Helpers
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

// node_modules
require('should');
var Handlebars = require('handlebars');

// Local helpers
require('../../lib/helpers/helpers-i18n').register(Handlebars, {});

var context = {
  language: 'en',
  en: {
    key: 'value'
  },
  fr: {
    key: 'valeur'
  },
  locales: ['en', 'fr']
};

describe('i18n', function () {
  describe('{{#i18n}}', function () {
    it('should take a key and return for the default language', function () {
      var source = '{{#i18n "key"}}{{/i18n}}';
      var template = Handlebars.compile(source);
      template(context).should.equal('value');
    });
    it('should take a key and return for the override language', function () {
      var source = '{{#i18n "key" language="fr"}}{{/i18n}}';
      var template = Handlebars.compile(source);
      template(context).should.equal('valeur');
    });
    it('should throw an error with new context', function() {
      var source = '{{#each locales}}{{ i18n "key" language=this }}{{/each}}'
      var template = Handlebars.compile(source);
    });
    it('should have access to root level context language', function () {
      var source = '{{#each locales}}{{ i18n "key" language=this context=.. }}{{/each}}'
      var template = Handlebars.compile(source);
      template(context).should.equal('valuevaleur');
    });
  });
});
