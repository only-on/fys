webpackJsonp([11],{"+0q0":function(t,a){},j8Tg:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("BO1k"),i=e.n(s),o=e("P9l9"),r={data:function(){return{img:"",form:{houseId:"",imageIds:"",type:"1"},modal:!1,isEmpty:!0,param:{pageNum:1,pageSize:8,type:"",houseId:""},size:[8,16,32,40,48],total:0,page:1,rows:8,typeList:[{id:1,name:"结构图片"},{id:2,name:"普通图片"}],imageList:[]}},methods:{handleRemoveImage:function(t){var a=this,e=this;e.$Modal.confirm({title:"确认删除该图片?",onOk:function(){var s={id:t};Object(o.J)(s).then(function(t){1e3===t.data.code?(e.$Message.success("删除成功！"),e.getImage(a.param)):e.$Message.error(t.data.message)})}})},add:function(){this.img="",this.form.imageIds="",this.modal=!0},handleUpload:function(t){var a=this,e=new FormData,s=!0,r=!1,n=void 0;try{for(var l,m=i()(t.target.files);!(s=(l=m.next()).done);s=!0){var c=l.value;e.append("file",c)}}catch(t){r=!0,n=t}finally{try{!s&&m.return&&m.return()}finally{if(r)throw n}}Object(o._9)(e,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){1e3===t.data.code?(a.img=t.data.content.url,a.form.imageIds=t.data.content.id):a.$Message.error(t.data.message),a.$refs.upload.value=""})},homeImageAdd:function(){var t=this;""!==this.form.imageIds?Object(o.I)(this.form).then(function(a){1e3===a.data.code?(t.getImage(t.param),t.modal=!1):t.$Message.error(a.data.message)}):this.$Message.error("图片不可以为空")},back:function(){this.$router.push({name:"house",params:{param:this.$route.params.param}})},changeUser:function(t){this.getImage(this.param)},change:function(t){this.page=t,this.param.pageNum=this.page,this.getImage(this.param)},doPageSizeChange:function(t){this.rows=t,this.param.pageSize=this.rows,this.getImage(this.param)},getImage:function(t){var a=this;Object(o.K)(t).then(function(t){if(1e3===t.data.code){a.imageList=t.data.content.list,a.total=t.data.content.total;var e=a.imageList.length%4;if(0!==e)for(var s=0;s<4-e;s++)a.imageList.push({url:-1});0===a.total?a.isEmpty=!0:a.isEmpty=!1}else a.imageList=[],a.total=0,a.isEmpty=!0})}},created:function(){void 0!==this.$route.params.id&&(this.param.houseId=this.$route.params.id,this.form.houseId=this.$route.params.id),this.getImage(this.param)}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Row",{staticClass:"titleBar",attrs:{type:"flex",justify:"start"}},[e("Icon",{staticClass:"closeIcon",attrs:{type:"md-close",size:"30"},on:{click:t.back}}),t._v(" "),e("div",{staticStyle:{margin:"10px 30px"}},[e("span",[t._v("\n       房屋管理\n       "),e("Icon",{attrs:{type:"ios-arrow-forward",size:"20"}})],1),t._v(" "),e("span",[t._v("房屋图片")])])],1),t._v(" "),e("div",{staticClass:"detailBody"},[e("div",{staticClass:"detailContentImage"},[e("Row",[e("Select",{staticClass:"head-search",staticStyle:{width:"200px",float:"left","margin-left":"20px"},attrs:{placeholder:"图片类型",clearable:"",transfer:!0},on:{"on-change":t.changeUser},model:{value:t.param.type,callback:function(a){t.$set(t.param,"type",a)},expression:"param.type"}},t._l(t.typeList,function(a){return e("Option",{key:a.id,attrs:{value:a.id}},[t._v(t._s(a.name))])}),1),t._v(" "),e("Button",{staticClass:"btn-save",staticStyle:{float:"right","margin-right":"20px"},on:{click:t.add}},[t._v("创建图片")])],1),t._v(" "),e("div",{staticClass:"content"},[t.isEmpty?e("div",{staticClass:"empty"},[t._v("暂无数据")]):t._e(),t._v(" "),t._l(t.imageList,function(a,s){return t.isEmpty?t._e():e("div",{key:s,staticClass:"imageItem",style:{visibility:-1===a.url?"hidden":"visible"}},[e("a",{attrs:{href:a.url,target:"_blank"}},[e("img",{staticStyle:{width:"370px",height:"220px"},attrs:{src:a.url,alt:""}})]),t._v(" "),e("div",{staticClass:"tip"},[e("Row",{staticClass:"tipInfo"},[e("div",{staticStyle:{float:"left"}},[t._v(t._s("1"===a.type||1===a.type?"结构图片":"2"===a.type||2===a.type?"普通图片":""))])])],1),t._v(" "),e("div",{staticClass:"mask-image"},[e("Icon",{attrs:{type:"ios-trash-outline",size:"24",color:"#fff"},nativeOn:{click:function(e){return t.handleRemoveImage(a.id)}}})],1)])})],2),t._v(" "),e("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[e("Page",{ref:"tablePage",attrs:{total:t.total,"page-size":t.rows,"show-sizer":"","show-total":"","page-size-opts":t.size,"show-elevator":"",transfer:!0},on:{"on-page-size-change":t.doPageSizeChange,"on-change":t.change}})],1)],1),t._v(" "),e("Modal",{model:{value:t.modal,callback:function(a){t.modal=a},expression:"modal"}},[e("p",{attrs:{slot:"header"},slot:"header"},[t._v("创建图片\n      ")]),t._v(" "),e("div",{staticClass:"formContent"},[e("Form",{ref:"formItem",attrs:{model:t.form,"label-width":150}},[e("FormItem",{staticClass:"selfValidate",attrs:{label:"类型"}},[e("RadioGroup",{model:{value:t.form.type,callback:function(a){t.$set(t.form,"type",a)},expression:"form.type"}},[e("Radio",{attrs:{label:"1"}},[t._v("结构图片")]),t._v(" "),e("Radio",{attrs:{label:"2"}},[t._v("普通图片")])],1)],1),t._v(" "),e("FormItem",{staticClass:"selfValidate",attrs:{label:"图片"}},[e("div",{staticClass:"file"},[e("input",{ref:"upload",staticStyle:{height:"30px"},attrs:{type:"file"},on:{change:t.handleUpload}}),t._v("上传图片\n            ")]),t._v(" "),e("Row",{directives:[{name:"show",rawName:"v-show",value:""!==t.img,expression:"img !== ''"}]},[e("Col",{attrs:{span:"4"}},[e("a",{attrs:{href:t.img,target:"_blank"}},[e("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.img,alt:"暂未传照片"}})])])],1)],1)],1)],1),t._v(" "),e("div",{staticStyle:{"text-align":"right"},attrs:{slot:"footer"},slot:"footer"},[e("Button",{on:{click:t.homeImageAdd}},[t._v("创建图片")])],1)])],1)],1)},staticRenderFns:[]};var l=e("VU/8")(r,n,!1,function(t){e("+0q0")},"data-v-e445bb7e",null);a.default=l.exports}});
//# sourceMappingURL=11.946709dd80cc2b41788f.js.map