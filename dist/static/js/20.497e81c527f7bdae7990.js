webpackJsonp([20],{HFLi:function(e,t){},NCon:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("P9l9"),i={data:function(){return{formItem:{id:"",fixedTypeName:"",fixedName:"",repairContent:"",imageUrl:"",repairer:"",phone:"",repairTime:"",type:""}}},methods:{getDetail:function(e){var t=this,a={repairId:e};Object(r.q)(a).then(function(e){if(1e3===e.data.code){var a=e.data.content;t.formItem={id:a.id,fixedTypeName:a.fixedTypeName,fixedName:a.fixedName,repairContent:a.repairContent,imageUrl:a.imageUrl,repairer:a.repairer,phone:a.phone,repairTime:a.repairTime,type:a.type}}else t.formItem={id:t.$route.params.id,fixedTypeName:"",fixedName:"",repairContent:"",imageUrl:"",repairer:"",phone:"",repairTime:"",type:""}})},back:function(){""===this.formItem.id?this.$router.push({name:"assets_Main"}):this.$router.push({name:"assets_Main",params:{param:this.$route.params.param}})}},created:function(){void 0!==this.$route.params.id&&(this.formItem.id=this.$route.params.id,this.getDetail(this.formItem.id))}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",{staticClass:"titleBar",attrs:{type:"flex",justify:"start"}},[a("Icon",{staticClass:"closeIcon",attrs:{type:"md-close",size:"30"},on:{click:e.back}}),e._v(" "),a("div",{staticStyle:{margin:"10px 30px"}},[a("span",[e._v("\n       固定资产管维\n       "),a("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),e._v(" "),a("span",[e._v(e._s(""===e.formItem.id?"创建":"编辑")+"维护记录")])])],1),e._v(" "),a("div",{staticClass:"detailBody"},[a("div",{staticClass:"detailContent"},[a("Row",{staticClass:"detailTitle",attrs:{type:"flex",justify:"start"}},[e._v("维护记录")]),e._v(" "),a("div",{staticClass:"formContent"},[a("Form",{ref:"formItem",attrs:{model:e.formItem,"label-width":150}},[a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"资产分类"}},[e._v("\n             "+e._s(e.formItem.fixedTypeName)+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"资产名称"}},[e._v("\n              "+e._s(e.formItem.fixedName)+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护类型"}},[e._v("\n              "+e._s(1===e.formItem.type?"损坏维修":"维护保养")+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护人姓名"}},[e._v("\n              "+e._s(e.formItem.repairer)+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"手机号码"}},[e._v("\n             "+e._s(e.formItem.phone)+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护时间"}},[e._v("\n              "+e._s(e.formItem.repairTime)+"\n            ")])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护图片"}},[null!==e.formItem.imageUrl?a("div",{staticClass:"box-image"},[a("a",{attrs:{href:e.formItem.imageUrl,target:"_blank"}},[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.formItem.imageUrl,alt:"上传照片"}})])]):e._e()])],1),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"维护内容"}},[e._v("\n                "+e._s(e.formItem.repairContent)+"\n            ")])],1)],1)],1)],1)])],1)},staticRenderFns:[]};var m=a("VU/8")(i,s,!1,function(e){a("HFLi")},"data-v-5c5ae2c3",null);t.default=m.exports}});
//# sourceMappingURL=20.497e81c527f7bdae7990.js.map