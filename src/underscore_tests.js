/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */
  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
      if (n) return array.splice(0,n);
      else { return array[0]}

  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
      if (n >= array.length) { return array;}
      else if (n) { return array.splice(array.length-n,array.length-1)}
      else { return array[array.length-1]}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {

      for (var i in collection) {
      iterator(collection[i],i,collection);
      }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
      var ind = -1;
      var len = array.length - 1;
      for (var i in array) {
          if (array[i] == target) { ind = Number(i); break;}
      }
      return ind;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
      var ret = collection;
      for (var i in ret) {
          if (!iterator(ret[i])) { ret.splice(i,1); i--}
      }
       return ret;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
      var ret = collection;
      for (var i in ret) {
          if (iterator(ret[i])) { ret.splice(i,1); i--}
      }
       return ret;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
      var uni = [];
      for (var i in array) {
          if (uni.indexOf(array[i]) == -1) { uni.push(array[i])}
      }
      return uni;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
      var arr = []
      for (var i of array) { arr.push(iterator(i))}
      return arr;
  };


  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
      var ret = [];
      for (var i in array) {
          ret[i] = array[i][propertyName];
      }
      return ret;
  };

  _.isFunction = function(arg) {
      if (typeof arg == 'function') {
          return true;
      }
      else { return false;}
  }

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
     return _.map(list, function(value) {
      var func = _.isFunction(methodName) ? methodName : value[methodName];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
      var sum = 0;
      for (var i in collection) {
          sum += collection[i];
      }
      return sum;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
      var contains = false;
      for (var i in collection) {
          if (collection[i] === target) { contains = true;}
      }
      return contains;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
      var ret = true;
      if (!iterator) {
          for (var i in collection) {
              if (!collection[i]) { ret = false; break;}
              return ret;
          }
      }
      for (var i in collection) {
          if (!iterator(collection[i])) { ret = false; break;}
      }
      return ret;

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
      var ret = false;
      if (!iterator) {
          var iterator = function(i) {return i;};
      }
      for (var i in collection) {
          if (iterator(collection[i])) { ret = true;}
      }
      return ret;
  };

  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).

  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  _.extend = function(obj) {
      if (!_.isObject(obj)) return {};
      for (var i = 1; i<arguments.length; i++) {
          for (var j in arguments[i]) {
              obj[j] = arguments[i][j];
          }
      }
      return obj;
  }



  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
      if (!_.isObject(obj)) return {};
      for (var i = 1; i<arguments.length; i++) {
          for (var j in arguments[i]) {
             if(!obj.hasOwnProperty(j)) obj[j] = arguments[i][j];
          }
      }
      return obj;
  }


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
      var ran = false, result;
      return function () {
          if (ran) return result;
          ran = true;
          result = func.apply(this, arguments);
          return result;
      }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
      var runs = {};
      return function (n) {
          runs[n] = runs[n] ? runs[n] : func.apply(this,arguments);
          return runs[n];
      }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var args = Array.prototype.slice.call(arguments,2);
      setTimeout(function() {
          func.apply(null,args);
      }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
      var tempArray = array.slice(0), newArray = [];
      for (var i in array) {
          newArray.push(tempArray.splice(Math.floor(Math.random() * tempArray.length)),1)
      }
      return newArray;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var byPropName = function (iterator) {
        return function (a,b) {
            return a[iterator] - b[iterator];
        }
    }
    var byIterator = function (iterator) {
        return function (a,b) {
            return iterator(a) - iterator(b);
        }
    }
    if (typeof iterator == 'string') {
        return collection.sort(byPropName(iterator));
    }
    else return (collection.sort(byIterator(iterator)))

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
        var arrays = Array.prototype.slice.call(arguments,0), result = [];
        function longer(champ, contender) {
        return (contender.length > champ.length) ? contender: champ;
        }
        var longest = arrays.reduce(longer).length;
        for (var i in arguments) {
            result.push([]);
        }
        for (var i of arguments) {
            for (var j = 0; j<longest; j++) {
                result[j].push(i[j]);
            }
        }
        return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
      if (!typeof nestedArray === 'array') return [];
      result = result || [];
      for (var i of nestedArray) {
          if (Array.isArray(i)) {
              _.flatten(i,result)
          }
          else result.push(i);
      }
      return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
      var shared = [];
      for (var i of arguments) {
          for (var j of i) {
              var curshared = true;
              for(var k of arguments) {
                  if (k.indexOf(j) == -1) curshared = false;
              }
              if (curshared && shared.indexOf(j) == -1) shared.push(j);
          }
      }
      return shared;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
      var shared = [];
      var rest = Array.prototype.slice.call(arguments,1);
      for (var i of arguments[0]) {
          var found = false;
          for (var j of rest) {
              if (j.indexOf(i) >= 0) found = true;
          }
          if (!found) shared.push(i);
      }
      return shared;
  };

}).call(this);
