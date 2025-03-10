/*!
 * Gitter Sidecar v1.5.0
 * https://sidecar.gitter.im/
 */
var sidecar = function(t) {
	function e(r) { if (i[r]) return i[r].exports; var n = i[r] = { exports: {}, id: r, loaded: !1 }; return t[r].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports } var i = {}; return e.m = t, e.c = i, e.p = "", e(0) }([function(t, e, i) { "use strict";

	function r(t) { return t && t.__esModule ? t : { default: t } } Object.defineProperty(e, "__esModule", { value: !0 }); var n = Object.assign || function(t) { for (var e = 1; e < arguments.length; e++) { var i = arguments[e]; for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]) } return t },
		o = i(1),
		a = r(o),
		u = i(3),
		M = r(u),
		c = function(t, e) { return t[e] || function() { return t[e] = {}, t[e] }() },
		s = { Chat: M.default },
		l = n({}, c(window, "gitter"), s),
		d = new a.default("gitter-sidecar-ready", { detail: s }); if (document.dispatchEvent(d), !((l.chat || {}).options || {}).disableDefaultChat) { var L = c(l, "chat");
		L.defaultChat = new M.default(L.options || {}) } e.default = s }, function(t, e) { "use strict";

	function i(t, e) { var i = e.bubbles,
			r = void 0 !== i && i,
			n = e.cancelable,
			o = void 0 !== n && n,
			a = e.detail,
			u = void 0 === a ? void 0 : a,
			M = void 0; try { M = new window.CustomEvent(t, { bubbles: r, cancelable: o, detail: u }) } catch (e) { M = document.createEvent("CustomEvent"), M.initCustomEvent(t, r, o, u) } return M } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i, i.prototype = window.Event.prototype }, function(t, e) { "use strict";

	function i(t) { if ("function" == typeof Symbol) return Symbol(t); var e = Math.random().toString(36).substr(2, 8); return t + e } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i }, function(t, e, i) { "use strict";

	function r(t) { if (t && t.__esModule) return t; var e = {}; if (null != t)
			for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e.default = t, e }

	function n(t) { return t && t.__esModule ? t : { default: t } }

	function o(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } Object.defineProperty(e, "__esModule", { value: !0 }); var a = function() {
			function t(t, e) { for (var i = 0; i < e.length; i++) { var r = e[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r) } } return function(e, i, r) { return i && t(e.prototype, i), r && t(e, r), e } }(),
		u = Object.assign || function(t) { for (var e = 1; e < arguments.length; e++) { var i = arguments[e]; for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]) } return t },
		M = i(2),
		c = n(M),
		s = i(1),
		l = n(s),
		d = i(5),
		L = n(d),
		N = i(7),
		f = n(N),
		g = i(4),
		x = r(g),
		y = i(6),
		j = n(y),
		T = function(t) { if (t) { var e = t.trim().toLowerCase(); if ("true" === e || "1" === e) return !0; if ("false" === e || "0" === e) return !1 } return t },
		b = function(t, e) { if (!e) return t; var i = {}; return Object.keys(t).forEach(function(t) { var r = "data-" + t; if (e.hasAttribute(r)) { var n = e.getAttribute(r);
					i[t] = n } }), u({}, t, i) },
		E = 32,
		D = 13,
		z = function(t, e) { t = (0, x.default)(t); var i = function(t) { if ("click" === t.type || "keydown" === t.type && (t.keyCode === E || t.keyCode === D)) { for (var i = arguments.length, r = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n];
					e.call.apply(e, [this, t].concat(r)) } }; return x.on(t, "click keydown", i),
				function() { x.off(t, "click keydown", i) } },
		h = function() { var t = new L.default,
				e = t.createElement("style"); return e.type = "text/css", e.innerHTML = f.default, x.prependElementTo(e, (0, x.default)("head")[0]), t },
		w = function(t) { var e = new L.default,
				i = t.targetElement; return i.forEach(function(i) { var r = b(t, i); if (r.room) { var n = e.createElement("iframe");
					n.setAttribute("frameborder", "0"), n.src = "" + t.host + r.room + "/~embed", i.appendChild(n) } else console.error("Gitter Sidecar: No room specified for targetElement", i) }), e },
		p = function(t) { var e = t.options,
				i = new L.default; return e.targetElement.forEach(function(r) { var n = i.createElement("div");
				n.classList.add("gitter-chat-embed-action-bar"), r.insertBefore(n, r.firstChild); var o = i.createElement("a");
				o.classList.add("gitter-chat-embed-action-bar-item"), o.classList.add("gitter-chat-embed-action-bar-item-pop-out"), o.setAttribute("aria-label", "Open Chat in Gitter.im"), o.setAttribute("href", "" + e.host + e.room), o.setAttribute("target", "_blank"), o.setAttribute("rel", "noopener"), n.appendChild(o); var a = i.createElement("button");
				a.classList.add("gitter-chat-embed-action-bar-item"), a.classList.add("gitter-chat-embed-action-bar-item-collapse-chat"), a.setAttribute("aria-label", "Collapse Gitter Chat"), z(a, function(e) { t.toggleChat(!1), e.preventDefault() }), n.appendChild(a) }), i },
		m = document.body || document.documentElement,
		v = { room: void 0, targetElement: void 0, activationElement: void 0, showChatByDefault: !1, preload: !1, useStyles: !0, layout: "fixed", host: "https://gitter.im/" },
		I = (0, c.default)("DEFAULTS"),
		A = (0, c.default)("OPTIONS"),
		C = (0, c.default)("ELEMENTSTORE"),
		S = (0, c.default)("EVENTHANDLESTORE"),
		O = (0, c.default)("INIT"),
		k = (0, c.default)("ISEMBEDDED"),
		U = (0, c.default)("EMBEDCHATONCE"),
		Y = (0, c.default)("TOGGLETARGETELEMENTS"),
		Q = function() {
			function t() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				o(this, t), this[C] = new L.default, this[S] = [], this[I] = v, this[A] = u({}, this[I], e), this[O]() } return a(t, [{ key: O, value: function() { var t = this,
						e = this[A];
					e.useStyles && this[C].add(h()), e.targetElement = (0, x.default)(e.targetElement || function() { var e = t[C].createElement("aside"); return e.classList.add("gitter-chat-embed"), e.classList.add("is-collapsed"), m.appendChild(e), e }()), e.targetElement.forEach(function(e) { var i = t[C].createElement("div");
						i.classList.add("gitter-chat-embed-loading-wrapper"), i.innerHTML = '\n        <div class="gitter-chat-embed-loading-indicator gitter-icon"></div>\n      ', e.insertBefore(i, e.firstChild) }), p(this), e.preload && this.toggleChat(!1), e.showChatByDefault ? this.toggleChat(!0) : (void 0 === e.activationElement || e.activationElement === !0 ? e.activationElement = (0, x.default)(function() { var i = t[C].createElement("a"); return i.href = "" + e.host + e.room, i.innerHTML = "Open Chat", i.classList.add("gitter-open-chat-button"), m.appendChild(i), i }()) : e.activationElement && (e.activationElement = (0, x.default)(e.activationElement)), e.activationElement && (z(e.activationElement, function(e) { t.toggleChat(!0), e.preventDefault() }), e.targetElement.forEach(function(t) { x.on(t, "gitter-chat-toggle", function(t) { var i = t.detail.state;
							e.activationElement.forEach(function(t) { x.toggleClass(t, "is-collapsed", i) }) }) }))); var i = z((0, x.default)(".js-gitter-toggle-chat-button"), function(e) { var i = T(e.target.getAttribute("data-gitter-toggle-chat-state"));
						t.toggleChat(null !== i ? i : "toggle"), e.preventDefault() });
					this[S].push(i), e.targetElement.forEach(function(e) { var i = new l.default("gitter-chat-started", { detail: { chat: t } });
						e.dispatchEvent(i) }); var r = new l.default("gitter-sidecar-instance-started", { detail: { chat: this } });
					document.dispatchEvent(r) } }, { key: U, value: function() { if (!this[k]) { var t = this[A],
							e = w(t);
						this[C].add(e) } this[k] = !0 } }, { key: Y, value: function(t) { var e = this[A];
					e.targetElement || console.warn("Gitter Sidecar: No chat embed elements to toggle visibility on"); var i = e.targetElement;
					i.forEach(function(e) { "toggle" === t ? x.toggleClass(e, "is-collapsed") : x.toggleClass(e, "is-collapsed", !t); var i = new l.default("gitter-chat-toggle", { detail: { state: t } });
						e.dispatchEvent(i) }) } }, { key: "toggleChat", value: function(t) { var e = this,
						i = this[A]; if (t && !this[k]) { var r = i.targetElement;
						r.forEach(function(t) { t.classList.add("is-loading") }), setTimeout(function() { e[U](), e[Y](t), r.forEach(function(t) { t.classList.remove("is-loading") }) }, 300) } else this[U](), this[Y](t) } }, { key: "destroy", value: function() { this[S].forEach(function(t) { t() }), this[C].destroy() } }, { key: "options", get: function() { return (0, j.default)(this[A]) } }]), t }();
	e.default = Q }, function(t, e) { "use strict";

	function i(t) { if (Array.isArray(t)) { for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e]; return i } return Array.from(t) }

	function r(t, e) { return M(t).forEach(function() { e && e.apply(void 0, arguments) }), this }

	function n(t, e, i) { return e.split(/\s/).forEach(function(e) { r(t, function(t) { t.addEventListener(e, i) }) }), this }

	function o(t, e, i) { return e.split(/\s/).forEach(function(e) { r(t, function(t) { t.removeEventListener(e, i) }) }), this }

	function a(t, e) { var i = (e.children || [])[0];
		i ? e.insertBefore(t, i) : e.appendChild(t) }

	function u(t, e, i) { return void 0 !== i ? i ? t.classList.add(e) : t.classList.remove(e) : t.classList.toggle(e), i } Object.defineProperty(e, "__esModule", { value: !0 }), e.forEach = r, e.on = n, e.off = o, e.prependElementTo = a, e.toggleClass = u; var M = function() { for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i]; return e.reduce(function(t, e) { return !e || void 0 === e.length || Array.isArray(e) || window && (!window || e instanceof window.constructor) || (e = Array.prototype.slice.call(e)), t.concat(e) }, []) },
		c = function() { for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r]; var n = e; if ("string" == typeof e[0]) { var o;
				n = (o = document.querySelectorAll).call.apply(o, [document].concat(e)) } return M.apply(void 0, i(n)) },
		s = function() { return c.apply(void 0, arguments) };
	e.default = s }, function(t, e) { "use strict";

	function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } Object.defineProperty(e, "__esModule", { value: !0 }); var r = function() {
			function t(t, e) { for (var i = 0; i < e.length; i++) { var r = e[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r) } } return function(e, i, r) { return i && t(e.prototype, i), r && t(e, r), e } }(),
		n = function(t) { t && t.parentElement.removeChild(t) },
		o = function() {
			function t() { i(this, t), this.elements = [] } return r(t, [{ key: "createElement", value: function() { for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i]; var r = document.createElement.apply(document, e); return this.add(r), r } }, { key: "add", value: function() { for (var e = arguments.length, i = Array(e), r = 0; r < e; r++) i[r] = arguments[r]; var n = [].concat(i).reduce(function(e, i) { return i ? i instanceof t ? e.concat(i.elements) : e.concat(i) : e }, []);
					this.elements = this.elements.concat(n) } }, { key: "destroy", value: function() { this.elements.forEach(function(t) { return n(t) }), this.elements = [] } }]), t }();
	e.default = o }, function(t, e) { "use strict";

	function i(t) { var e = {}; return Object.keys(t).forEach(function(i) { Object.defineProperty(e, i, { value: t[i], writable: !1, configurable: !1 }) }), e } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i }, function(t, e, i) { e = t.exports = i(8)(), e.push([t.id, '.gitter-hidden{box-sizing:border-box;display:none}.gitter-icon{box-sizing:border-box;width:22px;height:22px;fill:currentColor}.gitter-chat-embed{box-sizing:border-box;z-index:100;position:fixed;top:0;left:60%;bottom:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;background-color:#fff;border-left:1px solid #333;box-shadow:-12px 0 18px 0 rgba(50,50,50,.3);transition:transform .3s cubic-bezier(.16,.22,.22,1.7)}@context border-box{.gitter-chat-embed{box-sizing:border-box;background-color:#fff}}.gitter-chat-embed.is-collapsed:not(.is-loading){box-sizing:border-box;transform:translateX(110%)}.gitter-chat-embed:after{box-sizing:border-box;content:"";z-index:-1;position:absolute;top:0;left:100%;bottom:0;right:-100%;background-color:#fff}@context border-box{.gitter-chat-embed:after{box-sizing:border-box;background-color:#fff}}@media(max-width:1150px){.gitter-chat-embed{box-sizing:border-box;left:45%}}@media(max-width:944px){.gitter-chat-embed{box-sizing:border-box;left:30%}}@media(max-width:600px){.gitter-chat-embed{box-sizing:border-box;left:15%}}@media(max-width:500px){.gitter-chat-embed{box-sizing:border-box;left:0;border-left:none}}.gitter-chat-embed>iframe{box-sizing:border-box;-ms-flex:1;flex:1;width:100%;height:100%;border:0}.gitter-chat-embed-loading-wrapper{box-sizing:border-box;position:absolute;top:0;left:0;bottom:0;right:0;display:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.is-loading .gitter-chat-embed-loading-wrapper{box-sizing:border-box;display:-ms-flexbox;display:flex}.gitter-chat-embed-loading-indicator{box-sizing:border-box;opacity:.75;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzkyIDE3OTIiIGZpbGw9IiMzYTMxMzMiPjxwYXRoIGQ9Ik01MjYgMTM5NHEwIDUzLTM3LjUgOTAuNXQtOTAuNSAzNy41cS01MiAwLTkwLTM4dC0zOC05MHEwLTUzIDM3LjUtOTAuNXQ5MC41LTM3LjUgOTAuNSAzNy41IDM3LjUgOTAuNXptNDk4IDIwNnEwIDUzLTM3LjUgOTAuNXQtOTAuNSAzNy41LTkwLjUtMzcuNS0zNy41LTkwLjUgMzcuNS05MC41IDkwLjUtMzcuNSA5MC41IDM3LjUgMzcuNSA5MC41em0tNzA0LTcwNHEwIDUzLTM3LjUgOTAuNXQtOTAuNSAzNy41LTkwLjUtMzcuNS0zNy41LTkwLjUgMzcuNS05MC41IDkwLjUtMzcuNSA5MC41IDM3LjUgMzcuNSA5MC41em0xMjAyIDQ5OHEwIDUyLTM4IDkwdC05MCAzOHEtNTMgMC05MC41LTM3LjV0LTM3LjUtOTAuNSAzNy41LTkwLjUgOTAuNS0zNy41IDkwLjUgMzcuNSAzNy41IDkwLjV6bS05NjQtOTk2cTAgNjYtNDcgMTEzdC0xMTMgNDctMTEzLTQ3LTQ3LTExMyA0Ny0xMTMgMTEzLTQ3IDExMyA0NyA0NyAxMTN6bTExNzAgNDk4cTAgNTMtMzcuNSA5MC41dC05MC41IDM3LjUtOTAuNS0zNy41LTM3LjUtOTAuNSAzNy41LTkwLjUgOTAuNS0zNy41IDkwLjUgMzcuNSAzNy41IDkwLjV6bS02NDAtNzA0cTAgODAtNTYgMTM2dC0xMzYgNTYtMTM2LTU2LTU2LTEzNiA1Ni0xMzYgMTM2LTU2IDEzNiA1NiA1NiAxMzZ6bTUzMCAyMDZxMCA5My02NiAxNTguNXQtMTU4IDY1LjVxLTkzIDAtMTU4LjUtNjUuNXQtNjUuNS0xNTguNXEwLTkyIDY1LjUtMTU4dDE1OC41LTY2cTkyIDAgMTU4IDY2dDY2IDE1OHoiLz48L3N2Zz4=);animation:spin 2s infinite linear}@keyframes spin{0%{box-sizing:border-box;transform:rotate(0deg)}to{box-sizing:border-box;transform:rotate(359.9deg)}}.gitter-chat-embed-action-bar{box-sizing:border-box;position:absolute;top:0;left:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;padding-bottom:.7em;background:linear-gradient(180deg,#fff 0,#fff 50%,hsla(0,0%,100%,0))}.gitter-chat-embed-action-bar-item{box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:40px;height:40px;padding-left:0;padding-right:0;opacity:.65;background:none;background-position:50%;background-repeat:no-repeat;background-size:22px 22px;border:0;outline:none;cursor:pointer;cursor:hand;transition:all .2s ease}.gitter-chat-embed-action-bar-item:focus,.gitter-chat-embed-action-bar-item:hover{box-sizing:border-box;opacity:1}.gitter-chat-embed-action-bar-item:active{box-sizing:border-box;filter:hue-rotate(80deg) saturate(150)}.gitter-chat-embed-action-bar-item-pop-out{box-sizing:border-box;margin-right:-4px;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTcxLjQyOSIgZmlsbD0iIzNhMzEzMyI+PHBhdGggZD0iTTE1Ny4xNDMsMTAzLjU3MXYzNS43MTRjMCw4Ljg1NC0zLjE0NCwxNi40MjYtOS40MzEsMjIuNzEzcy0xMy44NTgsOS40MzEtMjIuNzEyLDkuNDMxSDMyLjE0MyBjLTguODU0LDAtMTYuNDI1LTMuMTQ0LTIyLjcxMi05LjQzMVMwLDE0OC4xNCwwLDEzOS4yODVWNDYuNDI5YzAtOC44NTQsMy4xNDQtMTYuNDI1LDkuNDMxLTIyLjcxMiBjNi4yODctNi4yODcsMTMuODU4LTkuNDMxLDIyLjcxMi05LjQzMWg3OC41NzJjMS4wNDEsMCwxLjg5NiwwLjMzNSwyLjU2NiwxLjAwNGMwLjY3LDAuNjcsMS4wMDQsMS41MjUsMS4wMDQsMi41NjdWMjUgYzAsMS4wNDItMC4zMzQsMS44OTctMS4wMDQsMi41NjdjLTAuNjcsMC42Ny0xLjUyNSwxLjAwNC0yLjU2NiwxLjAwNEgzMi4xNDNjLTQuOTExLDAtOS4xMTUsMS43NDktMTIuNjEyLDUuMjQ2IHMtNS4yNDYsNy43MDEtNS4yNDYsMTIuNjEydjkyLjg1NmMwLDQuOTExLDEuNzQ5LDkuMTE1LDUuMjQ2LDEyLjYxMnM3LjcwMSw1LjI0NSwxMi42MTIsNS4yNDVIMTI1YzQuOTEsMCw5LjExNS0xLjc0OCwxMi42MTEtNS4yNDUgYzMuNDk3LTMuNDk3LDUuMjQ2LTcuNzAxLDUuMjQ2LTEyLjYxMnYtMzUuNzE0YzAtMS4wNDIsMC4zMzQtMS44OTcsMS4wMDQtMi41NjdjMC42Ny0wLjY2OSwxLjUyNS0xLjAwNCwyLjU2Ny0xLjAwNGg3LjE0MyBjMS4wNDIsMCwxLjg5NywwLjMzNSwyLjU2NywxLjAwNEMxNTYuODA5LDEwMS42NzQsMTU3LjE0MywxMDIuNTI5LDE1Ny4xNDMsMTAzLjU3MXogTTIwMCw3LjE0M3Y1Ny4xNDMgYzAsMS45MzUtMC43MDcsMy42MDktMi4xMjEsNS4wMjJjLTEuNDEzLDEuNDE0LTMuMDg4LDIuMTIxLTUuMDIxLDIuMTIxYy0xLjkzNSwwLTMuNjA5LTAuNzA3LTUuMDIyLTIuMTIxbC0xOS42NDQtMTkuNjQzIGwtNzIuNzY3LDcyLjc2OWMtMC43NDQsMC43NDQtMS42LDEuMTE1LTIuNTY3LDEuMTE1cy0xLjgyMy0wLjM3MS0yLjU2Ny0xLjExNUw3Ny41NjcsMTA5LjcxYy0wLjc0NC0wLjc0NC0xLjExNi0xLjYtMS4xMTYtMi41NjcgYzAtMC45NjcsMC4zNzItMS44MjIsMS4xMTYtMi41NjZsNzIuNzY4LTcyLjc2OGwtMTkuNjQ0LTE5LjY0M2MtMS40MTMtMS40MTQtMi4xMi0zLjA4OC0yLjEyLTUuMDIyYzAtMS45MzUsMC43MDctMy42MDksMi4xMi01LjAyMiBDMTMyLjEwNSwwLjcwNywxMzMuNzc5LDAsMTM1LjcxNSwwaDU3LjE0M2MxLjkzNCwwLDMuNjA4LDAuNzA3LDUuMDIxLDIuMTIxQzE5OS4yOTMsMy41MzQsMjAwLDUuMjA4LDIwMCw3LjE0M3oiLz48L3N2Zz4=)}.gitter-chat-embed-action-bar-item-collapse-chat{box-sizing:border-box;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzEuNDI5IDE3MS40MjkiIGZpbGw9IiMzYTMxMzMiPjxwYXRoIGQ9Ik0xMjIuNDMzLDEwNi4xMzhsLTE2LjI5NSwxNi4yOTVjLTAuNzQ0LDAuNzQ0LTEuNiwxLjExNi0yLjU2NiwxLjExNmMtMC45NjgsMC0xLjgyMy0wLjM3Mi0yLjU2Ny0xLjExNmwtMTUuMjktMTUuMjkgbC0xNS4yOSwxNS4yOWMtMC43NDQsMC43NDQtMS42LDEuMTE2LTIuNTY3LDEuMTE2cy0xLjgyMy0wLjM3Mi0yLjU2Ny0xLjExNmwtMTYuMjk0LTE2LjI5NWMtMC43NDQtMC43NDQtMS4xMTYtMS42LTEuMTE2LTIuNTY2IGMwLTAuOTY4LDAuMzcyLTEuODIzLDEuMTE2LTIuNTY3bDE1LjI5LTE1LjI5bC0xNS4yOS0xNS4yOWMtMC43NDQtMC43NDQtMS4xMTYtMS42LTEuMTE2LTIuNTY3czAuMzcyLTEuODIzLDEuMTE2LTIuNTY3IEw2NS4yOSw0OC45OTZjMC43NDQtMC43NDQsMS42LTEuMTE2LDIuNTY3LTEuMTE2czEuODIzLDAuMzcyLDIuNTY3LDEuMTE2bDE1LjI5LDE1LjI5bDE1LjI5LTE1LjI5IGMwLjc0NC0wLjc0NCwxLjYtMS4xMTYsMi41NjctMS4xMTZjMC45NjcsMCwxLjgyMiwwLjM3MiwyLjU2NiwxLjExNmwxNi4yOTUsMTYuMjk0YzAuNzQ0LDAuNzQ0LDEuMTE2LDEuNiwxLjExNiwyLjU2NyBzLTAuMzcyLDEuODIzLTEuMTE2LDIuNTY3bC0xNS4yOSwxNS4yOWwxNS4yOSwxNS4yOWMwLjc0NCwwLjc0NCwxLjExNiwxLjYsMS4xMTYsMi41NjcgQzEyMy41NDksMTA0LjUzOSwxMjMuMTc3LDEwNS4zOTQsMTIyLjQzMywxMDYuMTM4eiBNMTQ2LjQyOSw4NS43MTRjMC0xMS4wMTItMi43MTctMjEuMTY4LTguMTQ4LTMwLjQ2OSBzLTEyLjc5Ny0xNi42NjctMjIuMDk4LTIyLjA5OFM5Ni43MjYsMjUsODUuNzE0LDI1cy0yMS4xNjgsMi43MTYtMzAuNDY5LDguMTQ3UzM4LjU3OSw0NS45NDUsMzMuMTQ3LDU1LjI0NlMyNSw3NC43MDMsMjUsODUuNzE0IHMyLjcxNiwyMS4xNjgsOC4xNDcsMzAuNDY5czEyLjc5NywxNi42NjYsMjIuMDk4LDIyLjA5OHMxOS40NTcsOC4xNDgsMzAuNDY5LDguMTQ4czIxLjE2OC0yLjcxNywzMC40NjktOC4xNDggczE2LjY2Ni0xMi43OTcsMjIuMDk4LTIyLjA5OFMxNDYuNDI5LDk2LjcyNiwxNDYuNDI5LDg1LjcxNHogTTE3MS40MjksODUuNzE0YzAsMTUuNTUxLTMuODMyLDI5Ljg5My0xMS40OTYsNDMuMDI0IGMtNy42NjQsMTMuMTMzLTE4LjA2MiwyMy41My0zMS4xOTQsMzEuMTk0Yy0xMy4xMzIsNy42NjQtMjcuNDc0LDExLjQ5Ni00My4wMjQsMTEuNDk2cy0yOS44OTItMy44MzItNDMuMDI0LTExLjQ5NiBjLTEzLjEzMy03LjY2NC0yMy41MzEtMTguMDYyLTMxLjE5NC0zMS4xOTRDMy44MzIsMTE1LjYwNywwLDEwMS4yNjUsMCw4NS43MTRTMy44MzIsNTUuODIyLDExLjQ5Niw0Mi42OSBjNy42NjQtMTMuMTMzLDE4LjA2Mi0yMy41MzEsMzEuMTk0LTMxLjE5NEM1NS44MjIsMy44MzIsNzAuMTY0LDAsODUuNzE0LDBzMjkuODkzLDMuODMyLDQzLjAyNCwxMS40OTYgYzEzLjEzMyw3LjY2NCwyMy41MywxOC4wNjIsMzEuMTk0LDMxLjE5NEMxNjcuNTk3LDU1LjgyMiwxNzEuNDI5LDcwLjE2NCwxNzEuNDI5LDg1LjcxNHoiLz48L3N2Zz4=)}.gitter-open-chat-button{z-index:100;position:fixed;bottom:0;right:10px;padding:1em 3em;background-color:#36bc98;border:0;border-top-left-radius:.5em;border-top-right-radius:.5em;font-family:sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;text-align:center;text-decoration:none;cursor:pointer;cursor:hand;transition:all .3s ease}.gitter-open-chat-button,.gitter-open-chat-button:visited{box-sizing:border-box;color:#fff}.gitter-open-chat-button:focus,.gitter-open-chat-button:hover{box-sizing:border-box;background-color:#3ea07f;color:#fff}.gitter-open-chat-button:focus{box-sizing:border-box;box-shadow:0 0 8px rgba(62,160,127,.6);outline:none}.gitter-open-chat-button:active{box-sizing:border-box;color:#eee}.gitter-open-chat-button.is-collapsed{box-sizing:border-box;transform:translateY(120%)}', ""]) }, function(t, e) { t.exports = function() { var t = []; return t.toString = function() { for (var t = [], e = 0; e < this.length; e++) { var i = this[e];
				i[2] ? t.push("@media " + i[2] + "{" + i[1] + "}") : t.push(i[1]) } return t.join("") }, t.i = function(e, i) { "string" == typeof e && (e = [
				[null, e, ""]
			]); for (var r = {}, n = 0; n < this.length; n++) { var o = this[n][0]; "number" == typeof o && (r[o] = !0) } for (n = 0; n < e.length; n++) { var a = e[n]; "number" == typeof a[0] && r[a[0]] || (i && !a[2] ? a[2] = i : i && (a[2] = "(" + a[2] + ") and (" + i + ")"), t.push(a)) } }, t } }]);
