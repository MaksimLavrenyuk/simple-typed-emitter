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
var e=function(){function e(){this.listeners=null}return e.prototype.getListenerHandle=function(e,t){var r=this;if(this.listeners)for(var s=function(s){if(i.listeners[e][s]===t)return{value:{deregister:function(){return!!r.listeners&&(r.listeners[e].splice(s,1),!0)}}}},i=this,n=0;n<this.listeners[e].length;n++){var l=s(n);if("object"==typeof l)return l.value}},e.prototype.registerListener=function(e,t){var r,s=this;return null!==this.listeners?this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t]:this.listeners=((r={})[e]=[t],r),{deregister:function(){if(s.listeners&&s.listeners[e])for(var r=0;r<s.listeners[e].length;r++)if(s.listeners[e][r]===t)return s.listeners[e].splice(r,1),!0;return!1}}},e.prototype.deregisterListener=function(e,t){var r=this.getListenerHandle(e,t);return!!r&&r.deregister()},e.prototype.emit=function(e,t){var r=this.listeners;r&&Object.keys(r).forEach((function(s){s===e&&r[e]&&r[e].forEach((function(e){e(t)}))}))},e}();export{e as default};
//# sourceMappingURL=index.esm.js.map
