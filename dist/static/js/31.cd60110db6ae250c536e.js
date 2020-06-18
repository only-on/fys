webpackJsonp([31],{Mmde:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("P9l9"),r={data:function(){return{mobilePhoneNotice:!1,detailAddress:"",typeList:[],formItem:{roomName:"",area:1,type:"0",lease:"0",houseId:"",useState:"3",explains:""}}},methods:{leaseChange:function(){"0"===this.formItem.lease?this.formItem.useState="3":this.formItem.useState="0"},submitVal:function(t){return 0!==t.roomName.toString().trim().length||(this.$Message.error("房间名称不能为空！"),!1)},save:function(){var t=this;this.submitVal(this.formItem)&&(""===this.formItem.id||void 0===this.formItem.id?Object(s._3)(this.formItem).then(function(e){1e3===e.data.code?(t.$Message.success("房间创建成功！"),t.back()):t.$Message.error(e.data.message)}):Object(s._7)(this.formItem).then(function(e){1e3===e.data.code?(t.$Message.success("房间编辑成功！"),t.back()):t.$Message.error(e.data.message)}))},getDetail:function(t){var e=this,a={roomId:t};Object(s._5)(a).then(function(t){if(1e3===t.data.code){var a=t.data.content;e.formItem={id:a.id,roomName:a.roomName,area:a.area,type:a.type+"",lease:a.lease+"",houseId:a.houseId,useState:a.useState+"",explains:a.explains}}else e.formItem={id:"",roomName:"",area:1,type:"0",lease:"0",houseId:e.$route.params.id,useState:"3",explains:""}})},back:function(){this.$router.push({name:"house_room",params:{id:this.$route.params.id,param:this.$route.params.param}})}},mounted:function(){},created:function(){this.formItem.houseId=this.$route.params.id,void 0!==this.$route.params.roomId&&(this.formItem.id=this.$route.params.roomId,this.getDetail(this.formItem.id))}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",{staticClass:"titleBar",attrs:{type:"flex",justify:"start"}},[a("Icon",{staticClass:"closeIcon",attrs:{type:"md-close",size:"30"},on:{click:t.back}}),t._v(" "),a("div",{staticStyle:{margin:"10px 30px"}},[a("span",[t._v("\n       房屋管理\n       "),a("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),t._v(" "),a("span",[t._v("\n       房间管理\n       "),a("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),t._v(" "),a("span",[t._v(t._s(""===t.formItem.id||void 0===t.formItem.id?"创建":"编辑")+"房间")])])],1),t._v(" "),a("div",{staticClass:"detailBody"},[a("div",{staticClass:"detailContent"},[a("Row",{staticClass:"detailTitle",attrs:{type:"flex",justify:"start"}},[t._v("房间信息")]),t._v(" "),a("div",{staticClass:"formContent"},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":150}},[a("Row",{attrs:{type:"flex"}},[a("FormItem",{staticClass:"selfValidate",attrs:{label:"房间名称"}},[a("Input",{staticStyle:{width:"300px",float:"left"},attrs:{placeholder:"请输入房间名称"},model:{value:t.formItem.roomName,callback:function(e){t.$set(t.formItem,"roomName",e)},expression:"formItem.roomName"}})],1)],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{staticClass:"selfValidate",attrs:{label:"房间类型"}},[a("RadioGroup",{staticStyle:{float:"left"},model:{value:t.formItem.type,callback:function(e){t.$set(t.formItem,"type",e)},expression:"formItem.type"}},[a("Radio",{staticStyle:{"margin-right":"20px"},attrs:{label:"0"}},[t._v("重要房间")]),t._v(" "),a("Radio",{staticStyle:{"margin-right":"20px"},attrs:{label:"1"}},[t._v("普通房间")])],1)],1)],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{staticClass:"selfValidate",attrs:{label:"是否租赁"}},[a("RadioGroup",{staticStyle:{float:"left"},on:{"on-change":t.leaseChange},model:{value:t.formItem.lease,callback:function(e){t.$set(t.formItem,"lease",e)},expression:"formItem.lease"}},[a("Radio",{staticStyle:{"margin-right":"20px"},attrs:{label:"0"}},[t._v("否")]),t._v(" "),a("Radio",{staticStyle:{"margin-right":"20px"},attrs:{label:"1"}},[t._v("是")])],1)],1)],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{staticClass:"selfValidate",attrs:{label:"使用状态"}},[a("RadioGroup",{staticStyle:{float:"left"},model:{value:t.formItem.useState,callback:function(e){t.$set(t.formItem,"useState",e)},expression:"formItem.useState"}},[a("Radio",{directives:[{name:"show",rawName:"v-show",value:"0"!==t.formItem.lease,expression:"formItem.lease !== '0'"}],staticStyle:{"margin-right":"20px"},attrs:{label:"0"}},[t._v("待出租")]),t._v(" "),a("Radio",{directives:[{name:"show",rawName:"v-show",value:"0"!==t.formItem.lease,expression:"formItem.lease !== '0'"}],staticStyle:{"margin-right":"20px"},attrs:{label:"1"}},[t._v("出租中")]),t._v(" "),a("Radio",{directives:[{name:"show",rawName:"v-show",value:"0"===t.formItem.lease,expression:"formItem.lease === '0'"}],staticStyle:{"margin-right":"20px"},attrs:{label:"3"}},[t._v("自用")]),t._v(" "),a("Radio",{directives:[{name:"show",rawName:"v-show",value:"0"===t.formItem.lease,expression:"formItem.lease === '0'"}],staticStyle:{"margin-right":"20px"},attrs:{label:"4"}},[t._v("空闲")])],1)],1)],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房间面积"}},[a("InputNumber",{staticStyle:{width:"300px",float:"left","margin-right":"5px"},attrs:{formatter:function(t){return(""+t).replace(/\d+\.\d{2,}/g,(""+t).substr(0,(""+t).indexOf(".")+3))},parser:function(t){return t.replace("-","")},min:1,max:99999999},model:{value:t.formItem.area,callback:function(e){t.$set(t.formItem,"area",e)},expression:"formItem.area"}}),t._v("㎡\n            ")],1)],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"房间说明"}},[a("Input",{staticStyle:{width:"100%"},attrs:{maxlength:"100","show-word-limit":"",type:"textarea",placeholder:"请输入房间说明",autosize:{minRows:2,maxRows:5}},model:{value:t.formItem.explains,callback:function(e){t.$set(t.formItem,"explains",e)},expression:"formItem.explains"}}),a("br")],1)],1)],1)],1)],1)],1),t._v(" "),a("Row",{staticStyle:{"margin-top":"30px"},attrs:{type:"flex"}},[a("Button",{staticClass:"btn-save",staticStyle:{padding:"5px 30px"},on:{click:t.save}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(r,o,!1,function(t){a("TpQL")},"data-v-1f11b11a",null);e.default=i.exports},TpQL:function(t,e){}});
//# sourceMappingURL=31.cd60110db6ae250c536e.js.map