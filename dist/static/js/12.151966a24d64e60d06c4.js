webpackJsonp([12],{FpwK:function(t,e){},yKI7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("P9l9"),s={data:function(){return{detailAddress:"",typeList:[],formItem:{houseName:"",area:1,type:"0",lease:"0",form:"1",useState:"3",owner:"",ownerIdCard:"",lng:"",lat:"",street:"",pixelX:null,pixelY:null,explains:""}}},methods:{getDetail:function(t){var e=this,a={houseId:t};Object(r.H)(a).then(function(t){if(1e3===t.data.code){var a=t.data.content;e.formItem={id:a.id,houseName:a.houseName,area:a.area,type:a.type+"",lease:a.lease+"",form:a.form+"",useState:a.useState+"",owner:a.owner,ownerIdCard:a.ownerIdCard,lng:a.lng,lat:a.lat,street:a.street,pixelX:a.pixelX,pixelY:a.pixelY,explains:a.explains}}else e.formItem={id:e.$route.params.id,houseName:"",area:1,type:"0",lease:"0",form:"1",useState:"3",owner:"",ownerIdCard:"",lng:"",lat:"",street:"",pixelX:null,pixelY:null,explains:""}})},back:function(){this.$router.push({name:"house",params:{param:this.$route.params.param}})}},mounted:function(){},created:function(){void 0!==this.$route.params.id&&(this.formItem.id=this.$route.params.id,this.getDetail(this.formItem.id))}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",{staticClass:"titleBar",attrs:{type:"flex",justify:"start"}},[a("Icon",{staticClass:"closeIcon",attrs:{type:"md-close",size:"30"},on:{click:t.back}}),t._v(" "),a("div",{staticStyle:{margin:"10px 30px"}},[a("span",[t._v("\n       房屋管理\n       "),a("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),t._v(" "),a("span",[t._v("房屋详情")])])],1),t._v(" "),a("div",{staticClass:"detailBody"},[a("div",{staticClass:"detailContent"},[a("Row",{staticClass:"detailTitle",attrs:{type:"flex",justify:"start"}},[t._v("房屋信息")]),t._v(" "),a("div",{staticClass:"formContent"},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":150}},[a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋名称"}},[t._v("\n              "+t._s(t.formItem.houseName)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋类型"}},[t._v("\n              "+t._s("0"===t.formItem.type?"重要房屋":"1"===t.formItem.type?"普通房屋":"-")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"是否租赁"}},[t._v("\n              "+t._s("0"===t.formItem.lease?"否":"1"===t.formItem.lease?"全部出租":"2"===t.formItem.lease?"部分出租":"-")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋类别"}},[t._v("\n              "+t._s("1"===t.formItem.form?"公有":"2"===t.formItem.form?"私有":"3"===t.formItem.form?"代管":"-")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"使用状态"}},[t._v("\n              "+t._s("0"===t.formItem.useState?"待出租":"1"===t.formItem.useState?"部分出租中":"2"===t.formItem.useState?"全部出租中":"3"===t.formItem.useState?"自用":"4"===t.formItem.useState?"空闲":"-")+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋面积"}},[t._v("\n              "+t._s(t.formItem.area)+"㎡\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"详细地址"}},[t._v("\n              "+t._s(t.formItem.street)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋经度"}},[t._v("\n              "+t._s(t.formItem.lng)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋纬度"}},[t._v("\n              "+t._s(t.formItem.lat)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"实景图中像素位置X"}},[t._v("\n              "+t._s(t.formItem.pixelX)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"实景图中像素位置Y"}},[t._v("\n              "+t._s(t.formItem.pixelY)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋所有人姓名"}},[t._v("\n              "+t._s(t.formItem.owner)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋所有人身份证号"}},[t._v("\n              "+t._s(t.formItem.ownerIdCard)+"\n            ")])],1),t._v(" "),a("Row",{attrs:{type:"flex"}},[a("FormItem",{attrs:{label:"房屋说明"}},[t._v("\n              "+t._s(t.formItem.explains)+"\n            ")])],1)],1)],1)],1)])],1)},staticRenderFns:[]};var m=a("VU/8")(s,o,!1,function(t){a("FpwK")},"data-v-d7859d30",null);e.default=m.exports}});
//# sourceMappingURL=12.151966a24d64e60d06c4.js.map