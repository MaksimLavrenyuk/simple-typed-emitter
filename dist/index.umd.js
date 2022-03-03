/**
 * MIT License
 *
 * Copyright (c) 2022 Maksim Lavrenyuk
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*! simple-typed-emitter 0.0.0 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).EventEmitter=t()}(this,(function(){"use strict";return function(){function e(){this.listeners=null}return e.prototype.getListenerHandle=function(e,t){var i=this;if(this.listeners)for(var n=function(n){if(s.listeners[e][n]===t)return{value:{deregister:function(){i.listeners&&i.listeners[e].splice(n,1)}}}},s=this,r=0;r<this.listeners[e].length;r++){var o=n(r);if("object"==typeof o)return o.value}},e.prototype.registerListener=function(e,t){var i,n=this;return null!==this.listeners?this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t]:this.listeners=((i={})[e]=[t],i),{deregister:function(){if(n.listeners&&n.listeners[e])for(var i=0;i<n.listeners[e].length;i++)if(n.listeners[e][i]===t){n.listeners[e].splice(i,1);break}}}},e.prototype.deregisterListener=function(e,t){var i=this.getListenerHandle(e,t);return!!i&&(i.deregister(),!0)},e.prototype.emit=function(e,t){var i=this.listeners;i&&Object.keys(i).forEach((function(n){n===e&&i[e]&&i[e].forEach((function(e){e(t)}))}))},e}()}));
//# sourceMappingURL=index.umd.js.map
