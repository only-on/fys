webpackJsonp([24],{VfPC:function(t,e){},wDYl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("P9l9"),r={data:function(){return{formItem:{typeName:"",isMaintain:"1",advanceDay:null,warningMode:"0",cycle:null}}},methods:{getDetail:function(t){var e=this,a={fixedTypeId:t};Object(n.C)(a).then(function(t){if(1e3===t.data.code){var a=t.data.content;e.formItem={id:a.id,typeName:a.typeName,isMaintain:a.isMaintain+"",advanceDay:a.advanceDay,warningMode:a.warningMode+"",cycle:a.cycle}}else e.formItem={id:e.$route.params.id,typeName:"",isMaintain:"1",advanceDay:null,warningMode:"0",cycle:null}})},back:function(){this.$router.push({name:"warn",params:{param:this.$route.params.param}})}},created:function(){void 0!==this.$route.params.row&&(this.formItem.id=this.$route.params.row.typeId,this.getDetail(this.formItem.id))}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",{staticClass:"titleBar",attrs:{type:"flex",justify:"start"}},[a("Icon",{staticClass:"closeIcon",attrs:{type:"md-close",size:"30"},on:{click:t.back}}),t._v(" "),a("div",{staticStyle:{margin:"10px 30px"}},[a("span",[t._v("\n       固定资产预警管理\n       "),a("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),t._v(" "),a("span",[t._v("预警规则详情")])])],1),t._v(" "),a("div",{staticClass:"detailBody"},[a("div",{staticClass:"detailContent"},[a("Row",{staticClass:"detailTitle",attrs:{type:"flex",justify:"start"}},[t._v("规则信息")]),t._v(" "),a("div",{staticClass:"formContent"},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":150}},[a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"资产分类"}},[t._v("\n              "+t._s(t.formItem.typeName)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"定期维护"}},[t._v("\n             "+t._s("1"===t.formItem.isMaintain?"是":"否")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"告警方式"}},[t._v("\n              "+t._s("0"===t.formItem.warningMode?"手机短信":"消息通知")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"提前预警天数"}},[t._v("\n              "+t._s(t.formItem.advanceDay)+" 天\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护周期"}},[t._v("\n              "+t._s(t.formItem.cycle)+" 天\n            ")])],1)],1)],1)],1)])],1)},staticRenderFns:[]};var i=a("VU/8")(r,s,!1,function(t){a("VfPC")},"data-v-3fcd99c8",null);e.default=i.exports}});
//# sourceMappingURL=24.d4453ab5fc5b0855b558.js.map