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
var e=function(){function e(){this.listeners=null}return e.prototype.getListenerHandle=function(e,t){var s=this;if(this.listeners)for(var r=function(r){if(i.listeners[e][r]===t)return{value:{deregister:function(){s.listeners&&s.listeners[e].splice(r,1)}}}},i=this,n=0;n<this.listeners[e].length;n++){var l=r(n);if("object"==typeof l)return l.value}},e.prototype.registerListener=function(e,t){var s,r=this;return null!==this.listeners?this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t]:this.listeners=((s={})[e]=[t],s),{deregister:function(){if(r.listeners&&r.listeners[e])for(var s=0;s<r.listeners[e].length;s++)if(r.listeners[e][s]===t){r.listeners[e].splice(s,1);break}}}},e.prototype.deregisterListener=function(e,t){var s=this.getListenerHandle(e,t);return!!s&&(s.deregister(),!0)},e.prototype.emit=function(e,t){var s=this.listeners;s&&Object.keys(s).forEach((function(r){r===e&&s[e]&&s[e].forEach((function(e){e(t)}))}))},e}();export{e as default};
//# sourceMappingURL=index.esm.js.map
