'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zUtils = require('z-utils');

function $ (selector, context) {
  return typeof selector !== 'string' ? selector : (context || document).queryselector(selector)
}

var AP = Array.prototype;
var slice = AP.slice;
var pop = AP.pop;
var push = AP.push;
var shift = AP.shift;
var unshift = AP.unshift;
var reverse = AP.reverse;
var splice = AP.splice;
var indexOf = AP.indexOf;
var forEach = AP.forEach;
var reduce = AP.reduce;
var reduceRight = AP.reduceRight;
var includes = AP.includes;
var find = AP.find;
var findIndex = AP.findIndex;

function $$$1 (selector, context) {
  var $2 = create($$$1.prototype);
  if (selector) {
    switch (typeof selector) {
      case 'string':
        selector = (context || document).queryselectorAll(selector);
        break
      case 'object':
        if(selector.cool) { return selector }
        if (selector === window || selector.nodeType) {
          $2[0] = selector;
          $2.length = 1;
          return $2
        }
        break
    }
    push.apply($2, selector);
  }
  return $2
}

var $$$2 = zUtils.assign($$$1, {
  from: function from(arrLike, fn){
    return slice.call(arrLike).forEach(fn)
  },
  of: function of(){
    return slice.call(arguments)
  }
});

zUtils.assign($$$1.prototype, {
  $: $,
  length: 0,
  pop: pop,
  push: push,
  shift: shift,
  unshift: unshift,
  reverse: reverse,
  splice: splice,
  indexOf: indexOf,
  forEach: forEach,
  reduce: reduce,
  reduceRight: reduceRight,
  find: find,
  findIndex: findIndex,
  includes: includes,
  toArray: function toArray(){
    return slice.call(this)
  },
  add: function add(){
    push.apply(this, arguments);
    return this
  },
  concat: function concat(){
    var this$1 = this;

    forEach.call(arguments, function (arr) {
      push.apply(this$1, arr);
    });
    return this
  }
});

var rSpace = /\s/;
var rSpaces = /\s+/;
var rSpaces_g = /\s+/g;
var rRNTFs_g = /[\r\n\t\f]+/g;

var regExps = {
  rSpace: rSpace,
  rSpaces: rSpaces,
  rSpaces_g: rSpaces_g,
  rRNTFs_g: rRNTFs_g
};

/**
 * 为元素添加指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String} newClass 指定要添加的样式类
 * @return {Boolean} 返回结果表明是否实际添加了样式类
 */
function addClass(elem, newClass) {
  var cssClass, wrapCssClass, testCssClass, newClasses, i = -1;
  // 若没有指定样式类
  if (!newClass || typeof newClass !== 'string' && !(newClass = newClass.trim())) {
    return false
  }

  if ((cssClass = elem.className) && (cssClass = cssClass.trim())) {
    if (cssClass === newClass) {
      return false
    }

    // 清理非空格的空白字符
    cssClass = cssClass.replace(rRNTFs_g, ' ');

    testCssClass = wrapCssClass = (' ' + cssClass + ' ');

    // 若添加单样式类
    if (newClass.indexOf(' ') < 0) {
      newClass = ' ' + newClass;
      if (testCssClass.indexOf(newClass + ' ') < 0) {
        elem.className = cssClass + newClass;
        return true
      }
      return false
    }

    // 添加多样式类
    newClasses = newClass.split(rSpaces);
    while (newClass = newClasses[++i]) {
      if (testCssClass.indexOf(' ' + (newClass += ' ')) < 0) {
        testCssClass += newClass;
      }
    }
    // 若已做了新增操作
    if (testCssClass !== wrapCssClass) {
      elem.className = testCssClass.slice(1, -1);
      return true
    }
  }
  return false
}

var root = zUtils.global.document && zUtils.global.document.documentElement;
/**
 * 检测元素是否匹配指定的选择器
 *
 * @param  {HTMLElement} elem 指定的元素
 * @param  {String} selector 匹配的选择器
 * @return {Boolean}
 */
var matches = root ? root.matches ? function matches (elem, selector) {
      return elem.matches(selector)
    } :
    root.matchesSelector ? function matches (elem, selector) {
        return elem.matchesSelector(selector)
      } :
      root.webkitMatchesSelector ? function matches (elem, selector) {
          return elem.webkitMatchesSelector(selector)
        } :
        root.mozMatchesSelector ? function matches (elem, selector) {
            return elem.mozMatchesSelector(selector)
          } :
          root.msMatchesSelector ? function matches (elem, selector) {
              return elem.msMatchesSelector(selector)
            } :
            function matches (elem, selector) {
              var parentNode = elem.parentNode,
                elems, i = -1;
              if (parentNode) {
                elems = parentNode.querySelectorAll(selector);
                while (elems[++i]) {
                  if (elems[i] === elem) { return true }
                }
                return false
              } else {
                parentNode = elem.ownerDocument.createElement('div');
                parentNode.appendChild(elem);
                return parentNode.querySelector(selector) === parentNode.removeChild(elem)
              }
            } :
  function matches (elem, selector) {
    return elem.matches ? elem.matches(selector) :
      elem.matchesSelector ? elem.matchesSelector(selector) :
        elem.webkitMatchesSelector ? elem.webkitMatchesSelector(selector) :
          elem.mozMatchesSelector ? elem.mozMatchesSelector(selector) :
            elem.msMatchesSelector ? elem.msMatchesSelector(selector) :
              function (elem, selector) {
                var parentNode = elem.parentNode,
                  elems, i = -1;
                if (parentNode) {
                  elems = parentNode.querySelectorAll(selector);
                  while (elems[++i]) {
                    if (elems[i] === elem) { return true }
                  }
                  return false
                } else {
                  parentNode = elem.ownerDocument.createElement('div');
                  parentNode.appendChild(elem);
                  return parentNode.querySelector(selector) === parentNode.removeChild(elem)
                }
              }(elem, selector)
  };

/**
 * 从一个元素向上检索一个匹配的祖先元素
 * 
 * @param  {HTMLElement} elem 开始查找的元素
 * @param  {String} selector 匹配的选择器
 * @param  {HTMLElement} root 指定一个祖先元素作为检索终止的根元素
 * @param  {Boolean} includeItself 是否包含开始查找的元素自身
 * @return {HTMLElement|null} 返回匹配元素或null
 */
function ancestor(elem, selector, root, includeItself) {
  var parentNode = elem;
  if (includeItself && matches(elem, selector)) {
    return elem
  }
  root || (root = elem.ownerDocument);
  while ((parentNode = parentNode.parentNode) && parentNode !== root) {
    if (matches(parentNode, selector)) {
      return parentNode
    }
  }
  return null
}

/**
 * 从一个元素向上检索所有匹配的祖先元素
 * 
 * @param  {HTMLElement} elem 开始查找的元素
 * @param  {String} selector 匹配的选择器
 * @param  {HTMLElement} root 指定一个祖先元素作为检索终止的根元素
 * @param  {Boolean} includeItself 是否包含开始查找的元素自身
 * @return {HTMLElement|null} 返回匹配元素或null
 */
function ancestorAll(elem, selector, root, includeItself) {
  var arr = [],
    parentNode = elem;
  includeItself && matches(elem, selector) && arr.push(elem);
  root || (root = elem.ownerDocument);
  while ((parentNode = parentNode.parentNode) && parentNode !== root) {
    matches(parentNode, selector) && arr.push(elem);
  }
  return arr
}

/**
 * 通过定义的样式类创建一个匹配的正则
 * 
 * @param  {String} cssClass 单个或多个样式类
 * @return {RegExp} 返回匹配的正则对象
 */
function regClass(cssClass) {
	return new RegExp('(?:^|\\s)(?:' + cssClass.trim().replace(rSpaces_g, '|') + ')(?!\\S)', 'g')
}

/**
 * 检测元素是否包含指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String|RegExp} testClass 指定检测的样式类
 * @param  {Boolean} matchAll 指定是否全部匹配（当指定检测多个样式类时）
 * @return {Boolean}
 */
function hasClass(elem, testClass, matchAll) {
  // 若没有指定样式类
  if(!testClass || (typeof testClass === 'string' ? !(testClass = testClass.trim()) : !testClass.test)){
    return false
  }
  var cssClass = elem.className,
    newClass, l;

  // 若元素无样式类
  if (cssClass && (cssClass = cssClass.trim())) {

    // 若测试一个正则表达式
    if (testClass.test) {
      return testClass.test(cssClass)
    }
    if (cssClass === testClass) {
      return true
    }

    cssClass = cssClass.replace(rRNTFs_g, ' ');

    // 若元素为单样式类
    if (cssClass.indexOf(' ') < 0) {
      return !matchAll && testClass.indexOf(' ') > -1 && (' ' + testClass + ' ').indexOf(' ' + cssClass + ' ') > -1
    }
    // 若检测单样式类
    if (testClass.indexOf(' ') < 0) {
      return (' ' + cssClass + ' ').indexOf(' ' + testClass + ' ') > -1
    }
    // 若检测多样式类
    if (matchAll) {
      newClass = (' ' + cssClass + ' ');
      testClass = (' ' + testClass.replace(rSpaces_g, ' , ') + ' ').split(',');
      l = testClass.length;
      while (--l) {
        if (newClass.indexOf(testClass[l]) < 0) {
          return false
        }
      }
      return true
    }

    return regClass(testClass).test(cssClass)
  }
  return false
}

/**
 * 从一个元素自身算起，向上检索一个匹配的祖先元素
 *     include itself ancestor
 * 
 * @param  {HTMLElement} elem 开始查找的元素
 * @param  {String} selector 匹配的选择器
 * @param  {HTMLElement} root 指定一个祖先元素作为检索终止的根元素
 * @return {HTMLElement|null} 返回匹配元素或null
 */
function iiancestor(elem, selector, root) {
  return ancestor(elem, selector, root, true)
}

/**
 * 从一个元素自身算起，向上检索所有匹配的祖先元素
 *     include itself ancestor all
 * 
 * @param  {HTMLElement} elem 开始查找的元素
 * @param  {String} selector 匹配的选择器
 * @param  {HTMLElement} root 指定一个祖先元素作为检索终止的根元素
 * @return {HTMLElement|null} 返回匹配元素或null
 */
function iiancestorAll(elem, selector, root) {
  return ancestorAll(elem, selector, root, true)
}

/**
 * 创建一个预置参数和事件预处理的ajax方法
 *   用于 jQuery.ajax 封装
 * @param  {Object} $ jQuery核心函数
 * @param  {Object} preOptions 预置的参数选项
 * @param  {Object} preHandleEvents 预设的事件处理函数hash集
 * @param  {Function} presetOptions 预设的参数处理函数，参数会被传入
 * @return {Object} 返回jquery的类Promise对象
 */
function presetAjax ($, preOptions, preHandleEvents, presetOptions) {

  preOptions = $.extend(true, {}, preOptions);
  preHandleEvents = $.extend({}, preHandleEvents);

  return function ajax (options) {

    var newOptions = $.extend({}, preOptions, options),
        $ajax,
        $ajaxThen,
        results = {},
        cloneOptions = $.extend(true, {}, options);

    presetOptions && presetOptions(newOptions);

    ['success', 'beforeSend', 'error', 'complete'].forEach(function (name) {
      newOptions[name] = this(name, preHandleEvents[name], options[name]);
    }, function (name, preHandleEvent, handleEvent) {
      return function () {
        var result;
        if (preHandleEvent) {
          result = results[name] = preHandleEvent.apply(this, Array.prototype.slice.call(arguments).concat(cloneOptions));
        }
        if (handleEvent && result !== false && !(result && typeof result.then === 'function')) {
          return handleEvent.apply(this, arguments)
        }
      }
    });

    $ajax = $.ajax(newOptions);

    // 同步请求直接返回原jquery ajax对象
    if ('async' in newOptions && !newOptions.async) {
      return $ajax
    }

    // 异步请求
    // 这里是为解决某些虽然请求success，但可能业务失败的预处理场景
    $ajaxThen = $ajax.then(function (res) {
      var result = results.success;
      // 后只覆盖属性（此时$ajax属性已变更）
      extendBind($ajaxThen, $ajax, true);
      // jquery2 对原生 Promise 返回对象不可直接使用
      // return result !== false ? res : Promise.reject(res)
      // return result !== false ? res : $.Deferred().reject(res)
      // 若 success 执行结果为类 Promise 对象，优先返回
      return result === false ? $.Deferred().reject(res) : result && typeof result.then === 'function' ? result : res
    });

    // 先只覆盖方法（绑定scope为$ajax）
    return extendBind($ajaxThen, $ajax, false)

    // 让return出的对象保持某些原方法可用（如：abort）
    // 将原 jQuery ajax 对象的绑定方法和属性，附加到then出的目标对象上
    // 被附加的绑定方法执行时，scope依然为原对象
    function extendBind (target, source, nofn) {
      $.each(source, function (k, v) {
        if (nofn || !(k in target)) {
          if (typeof v !== 'function') {
            target[k] = v;
          } else if (!nofn) {
            target[k] = function (v) {
              return function () {
                v.apply(source, arguments);
              }
            }(v);
          }
        }
      });
      return target
    }
  }
}

/**
 * 获取元素在页面中的矩形坐标
 * 
 * @param  {HTMLElement} elem DOM元素
 * @return {Object} 返回元素各个边的相对于页面的坐标及尺寸
 */
function rectCoord(elem) {
    
  var doc = elem.ownerDocument,
    docRoot = doc.documentElement,
    win = doc.defaultView,
    offsetTop = win.pageYOffset + docRoot.clientTop,
    offsetLeft = win.pageXOffset + docRoot.clientLeft,
    rectCoord = elem.getBoundingClientRect();

  return {
    top: rectCoord.top + offsetTop,
    right: rectCoord.right + offsetLeft,
    bottom: rectCoord.bottom + offsetTop,
    left: rectCoord.left + offsetLeft,
    width: rectCoord.width,
    height: rectCoord.height,
    originalRectCoord: rectCoord
  }
}

/**
 * 为元素删除指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String|RegExp} removedClass 指定要删除的样式类。若不是非空字符串或正则，直接清空元素全部样式
 * @return {Boolean} 返回结果表明是否实际删除了样式类
 */
function removeClass(elem, removedClass) {
  var cssClass, newClass, isRegExp;
  // 若没有指定样式类
  if (!removedClass || (typeof removedClass === 'string' ? !(removedClass = removedClass.trim()) : !(isRegExp = zUtils.typeOf(beReplacedClass) === 'RegExp'))) {
    elem.className = '';
    return true
  }

  // 已有样式类
  if ((cssClass = elem.className) && (cssClass = cssClass.trim())) {

    // 若测试一个正则表达式
    if (isRegExp) {
      newClass = cssClass.replace(removedClass, '');
      if (newClass !== cssClass) {
        elem.className = newClass;
        return true
      }
      return false
    }
    if (cssClass === removedClass) {
      elem.className = '';
      return true
    }
    // 若元素为多样式类
    if (rSpace.test(cssClass)) {
      newClass = cssClass.replace(regClass(removedClass), '');
      if (newClass === cssClass) {
        return false
      }
      elem.className = newClass;
      return true
    }
    // 若元素为单样式类
    if (removedClass.indexOf(' ') < 0 || (' ' + removedClass + ' ').indexOf(' ' + cssClass + ' ') < 0) {
      return false
    }
    elem.className = removedClass;
    return true
  }
  // 无样式类
  return false
}

/**
 * 为元素替换指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String|RegExp} beReplacedClass 指定被替换的样式类
 * @param  {String} replacedClass 指定用来替换的样式类
 * @param  {Boolean} whether 指定被替换的样式类无论是否存在，也要添加用来替换的样式类
 * @return {Boolean} 返回结果表明是否实际替换了样式类
 */
function replaceClass(elem, beReplacedClass, replacedClass, whether) {
  var cssClass, newClass, isString;
  // 若没有指定样式类
  if(!replacedClass || typeof replacedClass !== 'string'){
    return false
  }
  if (!beReplacedClass || ((isString = typeof beReplacedClass === 'string') ? !(beReplacedClass = beReplacedClass.trim()) : zUtils.typeOf(beReplacedClass) !== 'RegExp')) {
    return false
  }

  if ((cssClass = elem.className) && (cssClass = cssClass.trim())) {
    if (isString) {
      if (cssClass === beReplacedClass) {
        elem.className = replacedClass;
        return true
      }
      beReplacedClass = regClass(beReplacedClass);
    }

    newClass = cssClass.replace(beReplacedClass, '');
    if (newClass === cssClass) {
      if (whether) {
        elem.className = cssClass + ' ' + replacedClass;
        return true
      }
      return false
    }
    elem.className = newClass + ' ' + replacedClass;
    return true
  }
  if (whether) {
    elem.className = replacedClass;
    return true
  }
  return false
}

/**
 * 为元素交换指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String} cssClass1 指定交换的样式类1
 * @param  {String} cssClass2 指定交换的样式类2
 * @return {Number} range{-1,1} 返回实际交换的标识码
 *   返回  1 顺序后一个替换了前一个的样式类
 *   返回  0 未做任何替换
 *   返回 -1 逆序前一个替换了后一个的样式类
 */
function swapClass(elem, cssClass1, cssClass2) {
  var cssClass, newClass;
  // 若没有指定样式类
  if (!cssClass1 || typeof cssClass1 !== 'string' || !(cssClass1 = cssClass1.trim())) {
    return 0
  }
  if (!cssClass2 || typeof cssClass2 !== 'string' || !(cssClass2 = cssClass2.trim())) {
    return 0
  }

  if ((cssClass = elem.className) && (cssClass = cssClass.trim())) {
    if (cssClass === cssClass1) {
      elem.className = cssClass2;
      return 1
    }
    if (cssClass === cssClass2) {
      elem.className = cssClass1;
      return -1
    }

    newClass = cssClass.replace(regClass(cssClass1), '');
    if (newClass !== cssClass) {
      elem.className = newClass + ' ' + cssClass2;
      return 1
    }

    newClass = cssClass.replace(regClass(cssClass2), '');
    if (newClass !== cssClass) {
      elem.className = newClass + ' ' + cssClass1;
      return -1
    }
  }
  return 0
}

/**
 * 为元素开关指定的样式类
 * 
 * @param  {HTMLElement} elem DOM元素
 * @param  {String} toggledClass 指定的样式类
 * @param  {Boolean} matchAll 指定是否全部匹配（当指定多个样式类时）
 * @return {Number} range{-1,1} 返回结果标识码，表明实际是添加还是删除了样式类
 *   返回  1 添加了样式类
 *   返回  0 未做任何操作
 *   返回 -1 删除了样式类
 */
function toggleClass(elem, toggledClass, matchAll) {

  if (!(toggledClass && (toggledClass = toggledClass.trim()))) {
    return 0
  }
  var cssClass = elem.className,
    newClass;

  if (cssClass && (cssClass = cssClass.trim())) {
    if (cssClass === toggledClass) {
      elem.className = '';
      return -1
    }
    newClass = cssClass.replace(regClass(toggledClass), '');
    if (newClass === cssClass) {
      elem.className = cssClass + ' ' + toggledClass;
      return 1
    }
    if (toggledClass.indexOf(' ') < 0 || !matchAll) {
      elem.className = newClass;
      return -1
    }
    
  }
  elem.className = toggledClass;
  return 1
}

zUtils.assign($, {
  $$: $$$2,
  addClass: addClass,
  ancestor: ancestor,
  ancestorAll: ancestorAll,
  hasClass: hasClass,
  iiancestor: iiancestor,
  iiancestorAll: iiancestorAll,
  matches: matches,
  presetAjax: presetAjax,
  rectCoord: rectCoord,
  regClass: regClass,
  regExps: regExps,
  removeClass: removeClass,
  replaceClass: replaceClass,
  swapClass: swapClass,
  toggleClass: toggleClass
});

exports['default'] = $$$2;
exports.$ = $;
exports.$$ = $$$2;
exports.addClass = addClass;
exports.ancestor = ancestor;
exports.ancestorAll = ancestorAll;
exports.hasClass = hasClass;
exports.iiancestor = iiancestor;
exports.iiancestorAll = iiancestorAll;
exports.matches = matches;
exports.presetAjax = presetAjax;
exports.rectCoord = rectCoord;
exports.regClass = regClass;
exports.regExps = regExps;
exports.removeClass = removeClass;
exports.replaceClass = replaceClass;
exports.swapClass = swapClass;
exports.toggleClass = toggleClass;
