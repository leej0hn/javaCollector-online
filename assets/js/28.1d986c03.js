(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{292:function(t,a,s){t.exports=s.p+"assets/img/BTree.1ea13da1.png"},293:function(t,a,s){t.exports=s.p+"assets/img/B+Tree.50c068b3.png"},409:function(t,a,s){"use strict";s.r(a);var r=s(14),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"b树与b-树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b树与b-树"}},[t._v("#")]),t._v(" B树与B+树")]),t._v(" "),a("h2",{attrs:{id:"一-b树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一-b树"}},[t._v("#")]),t._v(" 一. B树")]),t._v(" "),a("p",[t._v("B-树是一种自平衡的搜索树，形式很简单：")]),t._v(" "),a("p",[a("img",{attrs:{src:s(292),alt:"B树"}})]),t._v(" "),a("p",[t._v("这就是一颗B-树。针对我们这个问题的最核心的特点如下：\n（1）多路，非二叉树\n（2）每个节点既保存索引，又保存数据\n（3）搜索时相当于二分查找")]),t._v(" "),a("h2",{attrs:{id:"二-b-树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二-b-树"}},[t._v("#")]),t._v(" 二. B+树")]),t._v(" "),a("p",[t._v("B+树是B-树的变种")]),t._v(" "),a("p",[a("img",{attrs:{src:s(293),alt:"B+树"}})]),t._v(" "),a("p",[t._v("最核心的特点如下：\n（1）多路非二叉\n（2）只有叶子节点保存数据\n（3）搜索时相当于二分查找\n（4）增加了相邻接点的指向指针。")]),t._v(" "),a("p",[t._v("从上面我们可以看出最核心的区别主要有俩，一个是数据的保存位置，一个是相邻节点的指向。")]),t._v(" "),a("h2",{attrs:{id:"三-b-树和b-树的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三-b-树和b-树的区别"}},[t._v("#")]),t._v(" 三. B-树和B+树的区别")]),t._v(" "),a("ul",[a("li",[t._v("B+树内节点不存储数据，所有数据存储在叶节点导致查询时间复杂度固定为 log n。")]),t._v(" "),a("li",[t._v("B-树查询时间复杂度不固定，与 key 在树中的位置有关，最好为O(1)。")]),t._v(" "),a("li",[t._v("B+树叶节点两两相连可大大增加区间访问性，可使用在范围查询等。")]),t._v(" "),a("li",[t._v("B-树每个节点 key 和 data 在一起，则无法区间查找。")]),t._v(" "),a("li",[t._v("B+树更适合外部存储(存储磁盘数据)。由于内节点无 data 域，每个节点能索引的范围更大更精确。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);