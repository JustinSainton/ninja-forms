!function(){var e,t,i;!function(n){function r(e,t){return w.call(e,t)}function l(e,t){var i,n,r,l,o,s,a,c,d,u,f,h=t&&t.split("/"),m=b.map,g=m&&m["*"]||{};if(e&&"."===e.charAt(0))if(t){for(e=e.split("/"),o=e.length-1,b.nodeIdCompat&&_.test(e[o])&&(e[o]=e[o].replace(_,"")),e=h.slice(0,h.length-1).concat(e),d=0;d<e.length;d+=1)if(f=e[d],"."===f)e.splice(d,1),d-=1;else if(".."===f){if(1===d&&(".."===e[2]||".."===e[0]))break;d>0&&(e.splice(d-1,2),d-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((h||g)&&m){for(i=e.split("/"),d=i.length;d>0;d-=1){if(n=i.slice(0,d).join("/"),h)for(u=h.length;u>0;u-=1)if(r=m[h.slice(0,u).join("/")],r&&(r=r[n])){l=r,s=d;break}if(l)break;!a&&g&&g[n]&&(a=g[n],c=d)}!l&&a&&(l=a,s=c),l&&(i.splice(0,s,l),e=i.join("/"))}return e}function o(e,t){return function(){var i=C.call(arguments,0);return"string"!=typeof i[0]&&1===i.length&&i.push(null),h.apply(n,i.concat([e,t]))}}function s(e){return function(t){return l(t,e)}}function a(e){return function(t){p[e]=t}}function c(e){if(r(v,e)){var t=v[e];delete v[e],y[e]=!0,f.apply(n,t)}if(!r(p,e)&&!r(y,e))throw new Error("No "+e);return p[e]}function d(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function u(e){return function(){return b&&b.config&&b.config[e]||{}}}var f,h,m,g,p={},v={},b={},y={},w=Object.prototype.hasOwnProperty,C=[].slice,_=/\.js$/;m=function(e,t){var i,n=d(e),r=n[0];return e=n[1],r&&(r=l(r,t),i=c(r)),r?e=i&&i.normalize?i.normalize(e,s(t)):l(e,t):(e=l(e,t),n=d(e),r=n[0],e=n[1],r&&(i=c(r))),{f:r?r+"!"+e:e,n:e,pr:r,p:i}},g={require:function(e){return o(e)},exports:function(e){var t=p[e];return"undefined"!=typeof t?t:p[e]={}},module:function(e){return{id:e,uri:"",exports:p[e],config:u(e)}}},f=function(e,t,i,l){var s,d,u,f,h,b,w=[],C=typeof i;if(l=l||e,"undefined"===C||"function"===C){for(t=!t.length&&i.length?["require","exports","module"]:t,h=0;h<t.length;h+=1)if(f=m(t[h],l),d=f.f,"require"===d)w[h]=g.require(e);else if("exports"===d)w[h]=g.exports(e),b=!0;else if("module"===d)s=w[h]=g.module(e);else if(r(p,d)||r(v,d)||r(y,d))w[h]=c(d);else{if(!f.p)throw new Error(e+" missing "+d);f.p.load(f.n,o(l,!0),a(d),{}),w[h]=p[d]}u=i?i.apply(p[e],w):void 0,e&&(s&&s.exports!==n&&s.exports!==p[e]?p[e]=s.exports:u===n&&b||(p[e]=u))}else e&&(p[e]=i)},e=t=h=function(e,t,i,r,l){if("string"==typeof e)return g[e]?g[e](t):c(m(e,t).f);if(!e.splice){if(b=e,b.deps&&h(b.deps,b.callback),!t)return;t.splice?(e=t,t=i,i=null):e=n}return t=t||function(){},"function"==typeof i&&(i=r,r=l),r?f(n,e,t,i):setTimeout(function(){f(n,e,t,i)},4),h},h.config=function(e){return h(e)},e._defined=p,i=function(e,t,i){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(i=t,t=[]),r(p,e)||r(v,e)||(v[e]=[e,t,i])},i.amd={jQuery:!0}}(),i("../lib/almond",function(){}),i("models/formModel",[],function(){var e=Backbone.Model.extend({defaults:{beforeForm:"",afterForm:"",beforeFields:"",afterFields:""},initialize:function(){n.channel("form-"+this.get("id")).reply("get:fieldByKey",this.getFieldByKey,this)},getFieldByKey:function(e){return this.get("fields").findWhere({key:e})}});return e}),i("models/formCollection",["models/formModel"],function(e){var t=Backbone.Collection.extend({model:e});return t}),i("models/fieldErrorModel",[],function(){var e=Backbone.Model.extend({});return e}),i("models/fieldErrorCollection",["models/fieldErrorModel"],function(e){var t=Backbone.Collection.extend({model:e});return t}),i("models/fieldModel",["models/fieldErrorCollection"],function(e){var t=Backbone.Model.extend({defaults:{placeholder:"",value:"",label_pos:"",classes:"ninja-forms-field",reRender:!1,mirror_field:!1,confirm_field:!1,clean:!0,disabled:""},initialize:function(){this.bind("change",this.changeModel,this),this.bind("change:value",this.changeValue,this),this.set("errors",new e)},changeModel:function(){n.channel("field-"+this.get("id")).trigger("change:model",this),n.channel(this.get("type")).trigger("change:model",this),n.channel("fields").trigger("change:model",this)},changeValue:function(){n.channel("field-"+this.get("id")).trigger("change:modelValue",this),n.channel(this.get("type")).trigger("change:modelValue",this),n.channel("fields").trigger("change:modelValue",this)},addWrapperClass:function(e){this.set("addWrapperClass",e)},removeWrapperClass:function(e){this.set("removeWrapperClass",e)}});return t}),i("models/fieldCollection",["models/fieldModel"],function(e){var t=Backbone.Collection.extend({model:e,comparator:"order"});return t}),i("controllers/formData",["models/formModel","models/formCollection","models/fieldCollection"],function(e,t,i){var r=Marionette.Object.extend({initialize:function(){var r=this;this.formCollection=new t,_.each(nfForms,function(t,n){var l=new e(t),o=new i(t.fields);o.sort(),l.set("fields",o),r.formCollection.add(l)}),_.each(this.formCollection.models,function(e){_.each(e.get("fields").models,function(t){t.set("formID",e.get("id")),n.channel(t.get("type")).trigger("init:model",t),n.channel("fields").trigger("init:model",t)}),n.channel("form").trigger("loaded",e),n.channel("form-"+e.get("id")).trigger("loaded",e)}),n.channel("app").reply("get:form",this.getForm,this),n.channel("app").reply("get:forms",this.getForms,this),n.channel("fields").reply("get:field",this.getField,this)},getForm:function(e){return this.formCollection.get(e)},getForms:function(){return this.formCollection},getField:function(e){var t=!1;return _.each(this.formCollection.models,function(i){t||(t=i.get("fields").get(e))}),t}});return r}),i("controllers/fieldError",["models/fieldErrorModel"],function(e){var t=Marionette.Object.extend({initialize:function(){n.channel("fields").reply("add:error",this.addError),n.channel("fields").reply("remove:error",this.removeError),n.channel("fields").reply("get:error",this.getError)},addError:function(e,t,i){var r=n.channel("fields").request("get:field",e),l=r.get("errors");l.add({id:t,msg:i}),r.set("errors",l),r.trigger("change:errors",r),n.channel("fields").trigger("add:error",r,t,i)},removeError:function(e,t){var i=n.channel("fields").request("get:field",e),r=i.get("errors"),l=r.get(t);"undefined"!=l&&(r.remove(l),i.set("errors",r),i.trigger("change:errors",i),n.channel("fields").trigger("remove:error",i,t))},getError:function(e,t){var i=n.channel("fields").request("get:field",e),r=i.get("errors"),l=r.get(t);return"undefined"!=l?l:!1}});return t}),i("controllers/changeField",[],function(){var e=Marionette.Object.extend({initialize:function(){n.channel("nfAdmin").reply("change:field",this.changeField)},changeField:function(e,t){var i=n.channel(t.get("type")).request("before:updateField",e,t);i="undefined"!=typeof i?i:jQuery(e).val(),t.set("isUpdated",!1),t.set("clean",!1),n.channel("field-"+t.get("id")).trigger("change:field",e,t),n.channel(t.get("type")).trigger("change:field",e,t),n.channel("fields").trigger("change:field",e,t),n.channel("nfAdmin").request("update:field",t,i)}});return e}),i("controllers/changeEmail",[],function(){var e=n.channel("email"),t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,i="invalid-email",r="Please enter a valid email address!",l=Marionette.Object.extend({initialize:function(){this.listenTo(e,"change:modelValue",this.emailChange),this.listenTo(e,"keyup:field",this.emailKeyup)},emailChange:function(e){var l=e.get("value"),o=e.get("id");0<l.length?t.test(l)?n.channel("fields").request("remove:error",o,i):n.channel("fields").request("add:error",o,i,r):n.channel("fields").request("remove:error",o,i)},emailKeyup:function(e,l,o){var s=jQuery(e).val(),a=l.get("id");0==s.length?(l.removeWrapperClass("nf-fail"),l.removeWrapperClass("nf-pass"),n.channel("fields").request("remove:error",a,i)):t.test(s)?t.test(s)&&(l.removeWrapperClass("nf-fail"),l.addWrapperClass("nf-pass"),n.channel("fields").request("remove:error",a,i)):(l.removeWrapperClass("nf-pass"),l.get("clean")||(l.addWrapperClass("nf-fail"),n.channel("fields").request("add:error",a,i,r)))}});return l}),i("controllers/fieldCheckbox",[],function(){var e=n.channel("checkbox"),t=Marionette.Object.extend({initialize:function(){e.reply("validate:required",this.validateRequired),n.channel("checkbox").reply("before:updateField",this.beforeUpdateField,this),n.channel("checkbox").reply("get:calcValue",this.getCalcValue,this)},beforeUpdateField:function(e,t){var i=jQuery(e).attr("checked");if(i)var n=1;else var n=0;return n},validateRequired:function(e,t){return e[0].checked},getCalcValue:function(e){return 1==e.get("value")?calcValue=e.get("checked_calc_value"):calcValue=e.get("unchecked_calc_value"),calcValue}});return t}),i("controllers/fieldCheckboxList",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("listcheckbox"),"init:model",this.register),n.channel("listcheckbox").reply("before:updateField",this.beforeUpdateField,this),n.channel("listcheckbox").reply("get:calcValue",this.getCalcValue,this)},register:function(e){if(e.set("renderOptions",this.renderOptions),e.set("renderOtherText",this.renderOtherText),e.set("selected",[]),0!=e.get("options").length){var t=_.filter(e.get("options"),function(e){return 1==e.selected});t=_.map(t,function(e){return e.value}),e.set("value",t)}},renderOptions:function(){var e=this,t="";if(""==this.value)var i=!0;else var i=!1;if(_.each(this.options,function(n){n.value==e.value&&(i=!0),n.fieldID=e.id,n.classes=e.classes,n.currentValue=e.value,n.selected&&e.selected.push(n.value),t+=_.template(jQuery("#nf-tmpl-field-listcheckbox-option").html(),n)}),1==this.show_other){"nf-other"==this.value&&(i=!1);var n={fieldID:this.id,classes:this.classes,currentValue:this.value,renderOtherText:this.renderOtherText,valueFound:i};t+=_.template(jQuery("#nf-tmpl-field-listcheckbox-other").html(),n)}return t},renderOtherText:function(){if("nf-other"==this.currentValue||!this.valueFound){"nf-other"==this.currentValue&&(this.currentValue="");var e={fieldID:this.fieldID,classes:this.classes,currentValue:this.currentValue};return _.template(jQuery("#nf-tmpl-field-listcheckbox-other-text").html(),e)}},getCalcValue:function(e){var t=0,i=e.get("options");return 0!=i.length&&_.each(e.get("value"),function(e){var n=_.find(i,function(t){return t.value==e});t=math.add(t,n.calc)}),t},beforeUpdateField:function(e,t){var i=t.get("selected")||[];"string"==typeof i&&(i=[i]);var n=jQuery(e).val(),r=jQuery(e).attr("checked");if(r)i.push(n);else{var l=i.indexOf(n);-1!=l&&i.splice(l,1)}return t.set("selected",i),1==t.get("show_other")&&t.set("reRender",!0),_.clone(i)}});return e}),i("controllers/fieldRadio",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("listradio"),"change:modelValue",this.changeModelValue),this.listenTo(n.channel("listradio"),"init:model",this.register),n.channel("listradio").reply("get:calcValue",this.getCalcValue,this)},register:function(e){if(e.set("renderOptions",this.renderOptions),e.set("renderOtherText",this.renderOtherText),0!=e.get("options").length){var t=_.find(e.get("options"),function(e){return 1==e.selected});"undefined"==typeof t&&(t=e.get("options")[0]),e.set("value",t.value)}},changeModelValue:function(e){1==e.get("show_other")&&e.set("reRender",!0)},renderOptions:function(){var e=this,t="";if(""==this.value)var i=!0;else var i=!1;if(_.each(this.options,function(n){n.value==e.value&&(i=!0),n.fieldID=e.id,n.classes=e.classes,n.currentValue=e.value,t+=_.template(jQuery("#nf-tmpl-field-listradio-option").html(),n)}),1==this.show_other){"nf-other"==this.value&&(i=!1);var n={fieldID:this.id,classes:this.classes,currentValue:this.value,renderOtherText:this.renderOtherText,valueFound:i};t+=_.template(jQuery("#nf-tmpl-field-listradio-other").html(),n)}return t},renderOtherText:function(){if("nf-other"==this.currentValue||!this.valueFound){"nf-other"==this.currentValue&&(this.currentValue="");var e={fieldID:this.fieldID,classes:this.classes,currentValue:this.currentValue};return _.template(jQuery("#nf-tmpl-field-listradio-other-text").html(),e)}},getCalcValue:function(e){var t=0;if(0!=e.get("options").length){var i=_.find(e.get("options"),function(t){return e.get("value")==t.value});"undefined"==typeof i&&(i=e.get("options")[0]);var t=i.calc}return t}});return e}),i("controllers/mirrorField",[],function(){var e=n.channel("fields"),t=Marionette.Object.extend({listeningModel:"",initialize:function(){this.listenTo(e,"init:model",this.registerMirror)},registerMirror:function(e){if(e.get("mirror_field")){this.listeningModel=e;var t=e.get("mirror_field");this.listenTo(n.channel("field-"+t),"change:modelValue",this.changeValue)}},changeValue:function(e){this.listeningModel.set("value",e.get("value")),this.listeningModel.set("reRender",!0)}});return t}),i("controllers/confirmField",[],function(){var e=n.channel("fields"),t="confirm-mismatch",i="These fields must match!",r=Marionette.Object.extend({initialize:function(){this.listenTo(e,"init:model",this.registerConfirm),this.listenTo(e,"keyup:field",this.confirmKeyup)},registerConfirm:function(t){if(t.get("confirm_field")){var i=e.request("get:field",t.get("confirm_field"));i.set("confirm_with",t.get("id"));var r=i.get("id"),l=t.get("id");this.listenTo(n.channel("field-"+r),"change:modelValue",this.changeValue),this.listenTo(n.channel("field-"+l),"change:modelValue",this.changeValue)}},changeValue:function(r){if("undefined"==typeof r.get("confirm_with"))var l=r,o=e.request("get:field",l.get("confirm_field"));else var o=r,l=e.request("get:field",o.get("confirm_with"));var s=(o.get("id"),l.get("id"));""==l.get("value")||l.get("value")==o.get("value")?n.channel("fields").request("remove:error",s,t):n.channel("fields").request("add:error",s,t,i)},confirmKeyup:function(e,r,l){var o=jQuery(e).val();if(r.get("confirm_field"))var s=r,a=r.get("id"),c=n.channel("fields").request("get:field",s.get("confirm_field")),d=c.get("value"),u=o;else if(r.get("confirm_with"))var s=n.channel("fields").request("get:field",r.get("confirm_with")),a=s.get("id"),u=s.get("value"),d=u;"undefined"!=typeof s&&(""==u?(s.removeWrapperClass("nf-fail"),s.removeWrapperClass("nf-pass"),n.channel("fields").request("remove:error",a,t)):o==d?(s.removeWrapperClass("nf-fail"),s.addWrapperClass("nf-pass"),n.channel("fields").request("remove:error",a,t)):(s.removeWrapperClass("nf-pass"),s.addWrapperClass("nf-fail"),n.channel("fields").request("add:error",a,t,i)))}});return r}),i("controllers/updateFieldModel",[],function(){var e=Marionette.Object.extend({initialize:function(){n.channel("nfAdmin").reply("update:field",this.updateField)},updateField:function(e,t){e.get("isUpdated")||(e.set("value",t),e.set("isUpdated",!0))}});return e}),i("controllers/submitButton",[],function(){var e=Marionette.Object.extend({initialize:function(e){this.model=e;var t=n.channel("form-"+e.get("formID")),i=n.channel("fields"),r=n.channel("field-"+e.get("id"));this.listenTo(i,"add:error",this.updateSubmit,this),this.listenTo(i,"remove:error",this.updateSubmit,this),this.listenTo(r,"click:field",this.submitForm,this),this.listenTo(t,"disable:submit",this.disableSubmit,this),this.listenTo(t,"enable:submit",this.enableSubmit,this)},updateSubmit:function(e,t,i){e.get("formID")==this.model.get("formID")&&(n.channel("form").request("get:errors",e.get("formID"))?this.disableSubmit(e,t,i):this.enableSubmit(e,t))},disableSubmit:function(e,t,i){"disabled"!=this.model.get("disabled")&&(this.model.set("disabled","disabled"),this.model.set("reRender",!0))},enableSubmit:function(e,t){"disabled"==this.model.get("disabled")&&(this.model.set("disabled",""),this.model.set("reRender",!0))},submitForm:function(e,t){var i=n.channel("form").request("get:errors",this.model.get("formID"));if(i)jQuery(e).closest(".nf-field-wrap").find(".nf-field-submit-error").show();else{var r=n.channel("app").request("get:form",t.get("formID"));if(_.each(r.get("fields").models,function(e){n.channel("submit").trigger("validate:field",e),n.channel(e.get("type")).trigger("before:submit",e),n.channel("fields").trigger("before:submit",e)}),console.log("before radio message"),n.channel("submit").trigger("before:submit",r),console.log("after radio message"),i=n.channel("form").request("get:errors",this.model.get("formID")))return!1;var l=JSON.stringify(r),o={action:"nf_ajax_submit",security:nfFrontEnd.ajaxNonce,formData:l};jQuery.ajax({url:nfFrontEnd.adminAjax,type:"POST",data:o,cache:!1,success:function(e,t,i){var r=jQuery.parseJSON(e);n.channel("submit").trigger("submit:response",r,t,i)},error:function(e,t,i){console.log("ERRORS: "+t),n.channel("submit").trigger("submit:response","error",t,e,i)}})}}});return e}),i("controllers/submitInit",["controllers/submitButton"],function(e){var t=n.channel("submit"),i=Marionette.Object.extend({initialize:function(){this.listenTo(t,"init:model",this.registerSubmit)},registerSubmit:function(t){t.set("maybeRenderError",this.maybeRenderError),new e(t)},maybeRenderError:function(){return n.channel("form").request("get:errors",this.formID)?_.template(jQuery("#nf-tmpl-field-submit-error-msg").html(),this):""}});return i}),i("controllers/getFormErrors",[],function(){var e=(n.channel("fields"),Marionette.Object.extend({initialize:function(e){n.channel("form").reply("get:errors",this.getFormErrors)},getFormErrors:function(e){var t=n.channel("app").request("get:form",e),i=!1;return t&&_.each(t.get("fields").models,function(e){"submit"!=e.get("type")&&e.get("errors").length>0&&(i=i||{},i[e.get("id")]=e.get("errors"))}),i}}));return e}),i("models/fileModel",[],function(){var e=Backbone.Model.extend({});return e}),i("models/fileCollection",["models/fileModel"],function(e){var t=Backbone.Collection.extend({model:e});return t}),i("views/fileItem",[],function(){var e=Marionette.ItemView.extend({tagName:"nf-section",template:"#nf-tmpl-field-file-row",onRender:function(){this.$el=this.$el.children(),this.$el.unwrap(),this.setElement(this.$el),0==jQuery(this.el).find("input:file").length&&jQuery(this.el).find(".nf-file-input").append(this.model.get("fileInput"))}});return e}),i("views/fileCollection",["views/fileItem"],function(e){var t=Marionette.CollectionView.extend({childView:e});return t}),i("controllers/selectFile",["models/fileCollection","views/fileCollection"],function(e,t){var i=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("file"),"init:model",this.initFile),this.listenTo(n.channel("file"),"render:view",this.renderView)},renderFileInput:function(){return _.template(jQuery("#nf-tmpl-field-file-input").html(),this)},initFile:function(t){t.set("files",new e),t.set("renderFileInput",this.renderFileInput),this.listenTo(n.channel("file"),"change:field",this.changeFile),this.listenTo(n.channel("fields"),"click:field",this.clickFileButton)},renderView:function(e){var i=jQuery(e.el).children(".nf-files-table");e.fileCollectionView=new t({el:i,collection:e.model.get("files"),thisModel:this.model}),e.model.bind("change:files",this.changeCollection,e)},changeCollection:function(){this.fileCollectionView.render()},clickFileButton:function(e,t){(jQuery(e).hasClass("nf-file-button")||jQuery(e).hasClass("nf-file-reset"))&&jQuery(e).closest(".nf-field-wrap").find("input[type=file].nf-element").click()},changeFile:function(e,t){if(""==jQuery(e).val())return!1;var i=jQuery(e)[0].files[0].name;console.log(jQuery(e).length);var n="",r=jQuery.trim(i);n=r.replace(/[^a-z0-9-]/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");var l=t.get("files");if(!l.get(n)){var o=jQuery(e),s=jQuery(e).clone();jQuery(o).removeClass("nf-element").off(),jQuery(s).val(""),jQuery(o).replaceWith(s),l.add({id:n,filename:i,fileInput:o}),t.set("files",l),t.trigger("change:files",t)}}});return i}),i("controllers/validateRequired",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("fields"),"blur:field",this.validateRequired),this.listenTo(n.channel("fields"),"change:field",this.validateRequired),this.listenTo(n.channel("fields"),"keyup:field",this.validateKeyup),this.listenTo(n.channel("fields"),"change:modelValue",this.validateModelData),this.listenTo(n.channel("submit"),"validate:field",this.validateModelData)},validateKeyup:function(e,t,i){var r=n.channel("fields").request("get:error",t.get("id"),"required-error");!r&&t.get("clean")||1!=t.get("required")||this.validateRequired(e,t)},validateRequired:function(e,t){if(1!=t.get("required"))return!1;var i=jQuery(e).val(),r=n.channel(t.get("type")).request("validate:required",e,t),l=!0;if(jQuery.trim(i)||(l=!1),"undefined"!=typeof r)var o=r;else var o=l;this.maybeError(o,t)},validateModelData:function(e){if(1!=e.get("required"))return!1;currentValue=e.get("value");var t=!0;jQuery.trim(currentValue)||(t=!1);var i=t;this.maybeError(i,e)},maybeError:function(e,t){e?n.channel("fields").request("remove:error",t.get("id"),"required-error"):n.channel("fields").request("add:error",t.get("id"),"required-error","This is a required field.")}});return e}),i("controllers/submitError",[],function(){var e=n.channel("submit"),t=Marionette.Object.extend({initialize:function(){this.listenTo(e,"submit:response",this.submitErrors)},submitErrors:function(e){_.size(e.errors)>0&&_.each(e.errors,function(e,t){n.channel("fields").request("add:error",t,"required-error",e)})}});return t}),i("controllers/actionRedirect",[],function(){var e=n.channel("submit"),t=Marionette.Object.extend({initialize:function(){this.listenTo(e,"submit:response",this.actionRedirect)},actionRedirect:function(e){"undefined"!=typeof e.data.halt&&"undefined"!=typeof e.data.halt.redirect&&""!=e.data.halt.redirect&&(window.location=e.data.halt.redirect),0==_.size(e.errors)&&"undefined"!=typeof e.data.actions&&"undefined"!=typeof e.data.actions.redirect&&""!=e.data.actions.redirect&&(window.location=e.data.actions.redirect)}});return t}),i("controllers/actionSuccess",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("submit"),"submit:response",this.actionSubmit)},actionSubmit:function(e){0==_.size(e.errors)&&"undefined"!=typeof e.data.actions&&"undefined"!=typeof e.data.actions.success_message&&""!=e.data.actions.success_message&&jQuery(".nf-response-msg").html(e.data.actions.success_message)}});return e}),i("controllers/fieldSelect",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("listselect"),"init:model",this.register),this.listenTo(n.channel("listmultiselect"),"init:model",this.register),n.channel("listselect").reply("get:calcValue",this.getCalcValue,this),n.channel("listmultiselect").reply("get:calcValue",this.getCalcValue,this)},register:function(e){if(e.set("renderOptions",this.renderOptions),e.set("renderOtherAttributes",this.renderOtherAttributes),0!=e.get("options").length){if("listmultiselect"==e.get("type")){var t=_.filter(e.get("options"),function(e){return 1==e.selected});t=_.map(t,function(e){return e.value});var i=t}else{var t=_.find(e.get("options"),function(e){return 1==e.selected});"undefined"==typeof t&&(t=e.get("options")[0]);var i=t.value}e.set("value",i)}},renderOptions:function(){var e=this,t="";return _.each(this.options,function(i){if(1==i.selected)var n=!0;else var n=!1;i.selected=n,i.fieldID=e.id,i.classes=e.classes,i.currentValue=e.value,t+=_.template(jQuery("#nf-tmpl-field-listselect-option").html(),i)}),t},renderOtherAttributes:function(){var e="";return"listmultiselect"==this.type&&(e+=" multiple"),e},getCalcValue:function(e){var t=0,i=e.get("options");if(0!=i.length)if("listmultiselect"==e.get("type"))_.each(e.get("value"),function(e){var n=_.find(i,function(t){return t.value==e});t=math.add(t,n.calc)});else{var n=_.find(i,function(t){return e.get("value")==t.value});"undefined"==typeof n&&(n=e.get("options")[0]),t=n.calc}return t}});return e}),i("controllers/coreSubmitResponse",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("submit"),"submit:response",this.actionSubmit)},actionSubmit:function(e){1==e.data.settings.clear_successfully_created_form,1==e.data.settings.hide_successfully_completed_form&&(jQuery(".nf-fields").hide(),jQuery(".nf-form-title").hide())}});return e}),i("controllers/fieldProduct",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("product"),"init:model",this.register)},register:function(e){e.set("renderProductQuantity",this.renderProductQuantity),e.set("renderProduct",this.renderProduct),e.set("renderOptions",this.renderOptions)},renderProduct:function(){switch(this.product_type){case"user":return _.template(jQuery("#nf-tmpl-field-textbox").html(),this);case"hidden":return _.template(jQuery("#nf-tmpl-field-hidden").html(),this);case"dropdown":return _.template(jQuery("#nf-tmpl-product-dropdown").html(),this);default:return _.template(jQuery("#nf-tmpl-product-single").html(),this)}},renderProductQuantity:function(){return 1==this.product_use_quantity?_.template(jQuery("#nf-tmpl-product-quantity").html(),this):void 0},renderOptions:function(){var e=this,t="";return _.each(this.options,function(i){if(1==i.selected)var n=!0;else var n=!1;i.selected=n,i.fieldID=e.id,i.classes=e.classes,i.currentValue=e.value,t+=_.template(jQuery("#nf-tmpl-product-"+e.product_type+"-option").html(),i)}),t}});return e}),i("controllers/fieldTotal",[],function(){var e=Marionette.Object.extend({totalModel:{},productTotals:{},initialize:function(){this.listenTo(n.channel("total"),"init:model",this.register),this.listenTo(n.channel("shipping"),"init:model",this.registerShipping)},register:function(e){this.totalModel=e;var t=e.get("formID");this.listenTo(n.channel("form-"+t),"loaded",this.onFormLoaded),this.listenTo(n.channel("product"),"change:modelValue",this.onChangeProduct),this.listenTo(n.channel("quantity"),"change:modelValue",this.onChangeQuantity)},registerShipping:function(e){this.shippingCost=e.get("shipping_cost")},onFormLoaded:function(e){var t=e.get("fields").models,i={},n={};for(var r in t){var l=t[r],o=l.get("id");if("product"==l.get("type"))i[o]=l;else if("quantity"==l.get("type")){var s=l.get("product_assignment");n[s]=l}}for(var s in i){var a=i[s],c=Number(a.get("product_price"));n[s]?c*=n[s].get("value"):1==a.get("product_use_quantity")&&(c*=a.get("value")),this.productTotals[s]=c}this.updateTotal()},onChangeProduct:function(e){var t=e.get("id"),i=Number(e.get("product_price")),n=Number(e.get("value")),r=n*i;this.productTotals[t]=r,this.updateTotal()},onChangeQuantity:function(e){var t=e.get("product_assignment"),i=n.channel("fields").request("get:field",t),r=Number(i.get("product_price")),l=Number(e.get("value")),o=l*r;this.productTotals[t]=o,this.updateTotal()},updateTotal:function(){var e=0;for(var t in this.productTotals)e+=Number(this.productTotals[t]);e&&this.shippingCost&&(e+=Number(this.shippingCost)),this.totalModel.set("value",e.toFixed(2)),this.totalModel.set("reRender",!0),this.totalModel.set("reRender",!1)}});return e}),i("controllers/fieldQuantity",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("quantity"),"init:model",this.registerQuantity)},registerQuantity:function(e){var t=e.get("product_assignment"),i=n.channel("fields").request("get:field",t);i&&i.set("product_use_quantity",0)}});return e}),i("controllers/fieldSubmit",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(n.channel("submit"),"init:model",this.register),this.listenTo(n.channel("submit"),"submit:response",this.onResponse)},register:function(e){this.submitModel=e,this.listenTo(n.channel("submit"),"click:field",this.onClick)},onClick:function(){this.label=this.submitModel.get("label");var e=this.submitModel.get("processing_label");this.submitModel.set("label",e),this.submitModel.set("reRender",!0)},onResponse:function(){this.submitModel.set("label",this.label),this.submitModel.set("reRender",!0)}});return e}),i("models/calcModel",[],function(){var e=Backbone.Model.extend({initialize:function(){this.set("formID",this.collection.options.formModel.get("id")),this.fields={};var e=this,t=this.get("eq"),i=t,r=t.match(new RegExp(/{field:(.*?)}/g));r=r.map(function(t){var r=t;r=r.replace("}","").replace("{field:",""),fieldModel=n.channel("form-"+e.get("formID")).request("get:fieldByKey",r),fieldModel.on("change:value",e.changeField,e);var l=n.channel(fieldModel.get("type")).request("get:calcValue",fieldModel);"undefined"==typeof l&&(l=jQuery.isNumeric(fieldModel.get("value"))?fieldModel.get("value"):0),l=jQuery.isNumeric(l)?l:0,e.fields[r]=l,i=i.replace(t,l)}),console.log(i+" = "),this.set("value",math.eval(i)),console.log(this.get("value"))},changeField:function(e){var t=e.get("key"),i=n.channel(e.get("type")).request("get:calcValue",e);"undefined"==typeof i&&(i=jQuery.isNumeric(e.get("value"))?e.get("value"):0),i=jQuery.isNumeric(i)?i:0,this.fields[t]=i;var r=this.get("eq"),l=!0;_.each(this.fields,function(e,t){r=r.replace("{field:"+t+"}",e),"undefined"==e&&(l=!1)}),l&&(console.log(r+" = "),this.set("value",math.eval(r)),console.log(this.get("value")))}});return e}),i("models/calcCollection",["models/calcModel"],function(e){var t=Backbone.Collection.extend({model:e,comparator:"order",initialize:function(e,t){this.options=t}});return t}),i("controllers/calculations",["models/calcCollection"],function(e){var t=Marionette.Object.extend({initialize:function(){this.calcs={},this.listenTo(n.channel("form"),"loaded",this.registerCalcs)},registerCalcs:function(t){this.calcs[t.get("id")]=new e(t.get("settings").calculations,{formModel:t})}});return t}),i("controllers/loadControllers",["controllers/formData","controllers/fieldError","controllers/changeField","controllers/changeEmail","controllers/fieldCheckbox","controllers/fieldCheckboxList","controllers/fieldRadio","controllers/mirrorField","controllers/confirmField","controllers/updateFieldModel","controllers/submitInit","controllers/getFormErrors","controllers/selectFile","controllers/validateRequired","controllers/submitError","controllers/actionRedirect","controllers/actionSuccess","controllers/fieldSelect","controllers/coreSubmitResponse","controllers/fieldProduct","controllers/fieldTotal","controllers/fieldQuantity","controllers/fieldSubmit","controllers/calculations"],function(e,t,i,n,r,l,o,s,a,c,d,u,f,h,m,g,p,v,b,y,w,C,_,j){var x=Marionette.Object.extend({initialize:function(){new t,new i,new n,new r,new l,new o,new s,new a,new c,new d,new u,new f,new h,new m,new g,new p,new v,new b,new y,new w,new C,new _,new j,new e}});return x}),i("views/beforeForm",[],function(){var e=Marionette.ItemView.extend({tagName:"nf-section",template:"#nf-tmpl-before-form"});return e}),i("views/fieldErrorItem",[],function(){var e=Marionette.ItemView.extend({tagName:"nf-section",template:"#nf-tmpl-field-error",onRender:function(){this.$el=this.$el.children(),this.$el.unwrap(),this.setElement(this.$el)}});return e}),i("views/fieldErrorCollection",["views/fieldErrorItem"],function(e){var t=Marionette.CollectionView.extend({tagName:"nf-errors",childView:e});return t}),i("views/fieldItem",["views/fieldErrorCollection"],function(e){var t=Marionette.ItemView.extend({tagName:"nf-section",initialize:function(){_.bindAll(this,"render"),this.model.bind("change:reRender",this.maybeRender,this),this.model.bind("change:errors",this.changeError,this),this.model.bind("change:addWrapperClass",this.addWrapperClass,this),this.model.bind("change:removeWrapperClass",this.removeWrapperClass,this),this.listenTo(n.channel("submit"),"before:submit",this.test),this.template="#nf-tmpl-field-"+this.model.get("wrap_template")},test:function(e){console.log("firing from trigger 1")},changeError:function(){0==this.model.get("errors").models.length?this.model.removeWrapperClass("nf-error"):this.model.addWrapperClass("nf-error"),this.errorCollectionView.render()},addWrapperClass:function(){var e=this.model.get("addWrapperClass");""!=e&&(jQuery(this.el).addClass(e),this.model.set("addWrapperClass",""))},removeWrapperClass:function(){var e=this.model.get("removeWrapperClass");
""!=e&&(jQuery(this.el).removeClass(e),this.model.set("removeWrapperClass",""))},maybeRender:function(){this.model.get("reRender")&&(this.render(),this.model.set("reRender",!1,{silent:!0}))},onRender:function(){this.$el=this.$el.children(),this.$el.unwrap(),this.setElement(this.$el);var t=jQuery(this.el).children(".nf-error-wrap");this.errorCollectionView=new e({el:t,collection:this.model.get("errors"),thisModel:this.model}),n.channel(this.model.get("type")).trigger("render:view",this),n.channel("fields").trigger("render:view",this)},templateHelpers:function(){return{renderElement:function(){this.setPlaceholder(),this.setClasses();var e=_.find(this.element_templates,function(e){return 0<jQuery("#nf-tmpl-field-"+e).length?!0:void 0});return _.template(jQuery("#nf-tmpl-field-"+e).html(),this)},renderLabel:function(){return _.template(jQuery("#nf-tmpl-field-label").html(),this)},setPlaceholder:function(){"inside"==this.label_pos&&(this.placeholder=this.label)},renderPlaceholder:function(){return""!=jQuery.trim(this.placeholder)?'placeholder="'+this.placeholder+'"':""},renderWrapClass:function(){var e="field-wrap "+this.type+"-wrap label-"+this.label_pos;return"undefined"!=typeof this.wrapper_class&&0<jQuery.trim(this.wrapper_class).length&&(e+=" "+this.wrapper_class),"undefined"!=typeof this.old_classname&&0<jQuery.trim(this.old_classname).length&&(e+=" "+this.old_classname+"-wrap"),e},setClasses:function(){this.error?this.classes+=" nf-error":this.classes=this.classes.replace("nf-error",""),"undefined"!=typeof this.element_class&&0<jQuery.trim(this.element_class).length&&(this.classes+=" "+this.element_class)}}},events:{"change .nf-element":"fieldChange","keyup .nf-element":"fieldKeyup","click .nf-element":"fieldClick","blur .nf-element":"fieldBlur"},fieldChange:function(e){var t=jQuery(e.currentTarget);n.channel("nfAdmin").request("change:field",t,this.model)},fieldKeyup:function(e){var t=jQuery(e.currentTarget),i=e.keyCode;n.channel("field-"+this.model.get("id")).trigger("keyup:field",t,this.model),n.channel(this.model.get("type")).trigger("keyup:field",t,this.model,i),n.channel("fields").trigger("keyup:field",t,this.model,i)},fieldClick:function(e){var t=jQuery(e.currentTarget);n.channel("field-"+this.model.get("id")).trigger("click:field",t,this.model),n.channel(this.model.get("type")).trigger("click:field",t,this.model),n.channel("fields").trigger("click:field",t,this.model)},fieldBlur:function(e){var t=jQuery(e.currentTarget);n.channel("field-"+this.model.get("id")).trigger("blur:field",t,this.model),n.channel(this.model.get("type")).trigger("blur:field",t,this.model),n.channel("fields").trigger("blur:field",t,this.model)}});return t}),i("views/fieldCollection",["views/fieldItem"],function(e){var t=Marionette.CollectionView.extend({tagName:"nf-fields-wrap",childView:e});return t}),i("views/formLayout",["views/fieldCollection"],function(e){var t=Marionette.LayoutView.extend({tagName:"nf-section",template:"#nf-tmpl-form-layout",regions:{beforeFields:".nf-before-fields",fields:".nf-fields",afterFields:".nf-after-fields"},onRender:function(){this.$el=this.$el.children(),this.$el.unwrap(),this.setElement(this.$el)},onShow:function(){this.fields.show(new e({collection:this.options.fieldCollection}))}});return t}),i("views/afterForm",[],function(){var e=Marionette.ItemView.extend({tagName:"nf-section",template:"#nf-tmpl-after-form"});return e}),i("views/mainLayout",["views/beforeForm","views/formLayout","views/afterForm"],function(e,t,i){var n=Marionette.LayoutView.extend({template:"#nf-tmpl-layout",regions:{responseMsg:".nf-response-msg",beforeForm:".nf-before-form",formLayout:".nf-form-layout",afterForm:".nf-after-form"},initialize:function(){this.$el=jQuery("#nf-form-"+this.model.id+"-cont"),this.el="#nf-form-"+this.model.id+"-cont",this.render(),this.beforeForm.show(new e({model:this.model})),this.formLayout.show(new t({model:this.model,fieldCollection:this.options.fieldCollection})),this.afterForm.show(new i({model:this.model}))},onRender:function(){}});return n}),t.config({baseUrl:nfFrontEnd.requireBaseUrl+"/front-end/"});var n=Backbone.Radio;jQuery(document).ready(function(e){t(["models/formCollection","models/formModel","models/fieldCollection","controllers/loadControllers","views/mainLayout"],function(e,t,i,r,l){var o=Marionette.Application.extend({forms:{},initialize:function(e){if("undefined"!=typeof nfFrontEnd.resumeProcessing){var t=JSON.stringify(nfFrontEnd.resumeProcessing),i={action:"nf_ajax_resume",security:nfFrontEnd.ajaxNonce,formData:t};jQuery.ajax({url:nfFrontEnd.adminAjax,type:"POST",data:i,cache:!1,success:function(e,t,i){var r=jQuery.parseJSON(e);n.channel("submit").trigger("submit:response",r,t,i)},error:function(e,t,i){console.log("ERRORS: "+t),n.channel("submit").trigger("submit:response","error",t,e,i)}})}new r},onStart:function(){var e=n.channel("app").request("get:forms");_.each(e.models,function(e,t){new l({model:e,fieldCollection:e.get("fields")})})}}),s=new o;s.start()})}),i("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=front-end.js.map
