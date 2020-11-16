module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=21)}([function(t,e){t.exports=flarum.core.compat.app},function(t,e){t.exports=flarum.core.compat.Model},function(t,e,n){"use strict";function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}n.d(e,"a",(function(){return r}))},function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,e,n){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.d(e,"a",(function(){return s}));var o=n(2);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=n(1),i=n.n(u),s=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),u=0;u<n;u++)o[u]=arguments[u];return a(r(e=t.call.apply(t,[this].concat(o))||this),"content",i.a.attribute("content")),a(r(e),"contentHtml",i.a.attribute("contentHtml")),a(r(e),"group",i.a.hasOne("group")),a(r(e),"members",i.a.hasMany("members")),e}return Object(o.a)(e,t),e}(i.a)},function(t,e){t.exports=flarum.core.compat["components/IndexPage"]},function(t,e){t.exports=flarum.core.compat["helpers/listItems"]},,,,function(t,e){t.exports=flarum.core.compat["components/LinkButton"]},function(t,e){t.exports=flarum.core.compat["components/Page"]},function(t,e){t.exports=flarum.core.compat["components/GroupBadge"]},function(t,e){t.exports=flarum.core.compat["components/Link"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["helpers/username"]},function(t,e){t.exports=flarum.core.compat["helpers/userOnline"]},,,,function(t,e,n){"use strict";n.r(e);var r=n(3),o=n(0),a=n.n(o),u=n(6),i=n.n(u),s=n(11),c=n.n(s),p=n(2),l=n(12),f=n.n(l),d=n(4),g=n.n(d),b=n(13),h=n.n(b),v=n(7),y=n.n(v),x=n(14),k=n.n(x),w=n(15),L=n.n(w),O=n(16),P=n.n(O),j=n(17),G=n.n(j),I=function(){function t(){}var e=t.prototype;return e.view=function(t){var e=this;return m("ul.GroupList-UserList",t.attrs.users.map((function(n){return m("li.GroupList-UserList-item",m(k.a,{href:a.a.route.user(n)},[m(".GroupList-UserList-avatar",[L()(n),e.badges(n,t.attrs.hideBadgeId)]),m(".GroupList-UserList-user",[a.a.forum.attribute("clarkwinkelmann-group-list.showOnlineStatus")?G()(n):null,P()(n)])]))})))},e.badges=function(t,e){if(!a.a.forum.attribute("clarkwinkelmann-group-list.showAvatarBadges"))return null;var n=t.badges();return n.has(e)&&n.remove(e),m("ul.badges",y()(n.toArray()))},t}(),_=function(t){function e(){return t.apply(this,arguments)||this}Object(p.a)(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.items=null,app.request({method:"GET",url:app.forum.attribute("apiUrl")+"/clarkwinkelmann-group-list"}).then((function(t){n.items=app.store.pushPayload(t),m.redraw()})),this.bodyClass="GroupList-page"},n.view=function(){return m(".IndexPage",[i.a.prototype.hero(),m(".container",m(".sideNavContainer",[m("nav.IndexPage-nav.sideNav",m("ul",y()(i.a.prototype.sidebarItems().toArray()))),m(".IndexPage-results.sideNavOffset.GroupList-content",this.content())]))])},n.content=function(){return null===this.items?g.a.component():this.items.map((function(t){return m("div",[m("h3.GroupList-title",[h.a.component({group:t.group()})," ",t.group().namePlural()]),t.contentHtml()?m(".GroupList-description",m.trust(t.contentHtml())):null,m(I,{users:t.members(),hideBadgeId:"group"+t.group().id()})])}))},e}(f.a),S=n(5);a.a.initializers.add("clarkwinkelmann-group-list",(function(){a.a.routes["clarkwinkelmann-group-list"]={path:"/groups",component:_},a.a.store.models["clarkwinkelmann-group-list-items"]=S.a,Object(r.extend)(i.a.prototype,"navItems",(function(t){a.a.forum.attribute("clarkwinkelmann-group-list.showSideNavLink")&&t.add("clarkwinkelmann-group-list-item",c.a.component({href:a.a.route("clarkwinkelmann-group-list"),icon:"fas fa-users"},a.a.translator.trans("clarkwinkelmann-group-list.forum.nav")),85)}))}))}]);
//# sourceMappingURL=forum.js.map