/* jshint expr: true */

define(function(require) {

	'use strict';

	function dateComparator(a, b) {
		a = new Date(a);
		b = new Date(b);
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	}

	function clean(collections) {
		collections.forEach(function(collection) {
			collection.reset();
			collection.localStorage._clear();
		});
	}

	return {
		dateComparator: dateComparator,
		clean: clean
	};
});
