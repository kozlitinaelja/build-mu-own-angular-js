/**
 * Created by elle on 11/3/14.
 */

/* jshint globalstrict: true */
/* global parse: false */

describe('parse', function() {

  it('can parse integer', function() {
    var fn = parse('42');
    expect(fn).toBeDefined();
    expect(fn()).toBe(42);
  });

  it('makes integers both literal and constant', function () {
    var fn = parse('42');
    expect(fn.constant).toBe(true);
    expect(fn.literal).toBe(true);
  });

});
