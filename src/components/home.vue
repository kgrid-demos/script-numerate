<template>
<div class='content'>
	<applayout :nothelper='true'>
		<div slot='banner'>
			<div class='bannercontent'>
				<h1 style='color:#0075bc;font-weight:700;'>Druggle</h1>
				<h1>To See the prescribing pattern </h1>
				<v-autocomplete :items="items" v-model="item" :get-label="getLabel"  :min-len='0' @blur='blur' :component-item='template' @item-selected='itemSelected' @item-clicked='itemSelected' @update-items="updateItems">
			   </v-autocomplete>
			</div>
		</div>
		<!-- <div slot='header'>
		</div> -->
		<div slot='maincontent'>

			<span v-show='resultready' style='font-size:20px; font-style:italic; font-weight:500;'> {{selectedrxcui}} - {{selectedname}}</span>
			<kogrid v-show='resultready'
	:data="siglist"
	:columns="gridColumns"
	:filter-key="searchQuery">
</kogrid>
	<span v-show='resultready'>Total Prescription Count: {{count}}</span>
		</div>
			</applayout>
		</div>
</template>
<script>
import moment from 'moment'
import itemtemplate from './itemtemplate.vue'
import applayout from './applayout.vue';
import store from '../store'
import axios from 'axios';
import kogrid from './kogrid.vue';
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/regular/times-circle'
import Drugs from './drugs.js'

export default {
  name: 'home',
	data () {
     return {
			 // activator_url:'http://localhost:8080/',
			 activator_url:'https://kgrid-activator.herokuapp.com/',
			 selectedrxcui:'',
			 selectedname:'',
       item: null,
       items: [],
			 siglist:[],
       template: itemtemplate,
			 gridColumns:['sig','pattern','frequency'],
			 searchQuery:'',
			 // resultready:false,
			 count:0
     }
   },
	 computed:{
		 resultready:function(){
			 return this.item!=null
		 }
	 },
   methods: {
		 itemSelected (item) {
			 var self = this
			 this.siglist=[]
			 // this.resultready=false
			 if(Object.keys(item).length != 0 ){
			 		this.selectedrxcui=item.rxcui
					this.selectedname=item.name
			 		console.log('Selected item!', item)
			 		var input={}
			 		input.rxcui=this.selectedrxcui
			 		var obj={}
			 	obj.arkID = '99999/'+this.selectedrxcui+'sig/v0.0.1/'
 		 		obj.endpoint = 'rxsigs'
 			obj.data= JSON.stringify(input)
 			obj.success= function(response) {
	 				console.log(response)
					var outcome = JSON.parse(response.result)
					self.siglist=outcome.sigs
					// self.resultready=true
					self.count = outcome.total
 				}
				obj.error=function(resp){
					console.error(resp)
				}
 			this.KOPostaxios(obj)
			}
		},
		blur(item){
			if(item){
				this.itemSelected (item)
			}
		},
		itemClicked (item) {
			console.log('You clicked an item!', item)
		},
     getLabel (item) {
			 if (item) {
        return item.name
      }
      return ''
     },
     updateItemspro (text) {
       this.update(text).then( (response) => {
         this.items = response
       })
     },
		 updateItems (text) {
			 var list = JSON.parse(JSON.stringify(Drugs))
			 console.log(list)
    		this.items = list.filter((item) => {
        		return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
      		})
    },
		KOPostaxios:function(instr){
		var self = this
		var config = {
			method:'post',
			url:this.activator_url+ instr.arkID + instr.endpoint,
			"headers": {
				"content-type": "application/json",
			},
			"data": instr.data
		}
		// self.appendLog(instr.key, "K-GRID Service Request - Sending Patient Data to Knowledge Object: " + instr.arkID);
		axios(config)
			.then(function(response){
				instr.success(response.data);
				// self.appendLog(instr.key, "K-GRID Service Response - Response results returned from Knowledge Object: " + instr.arkID);
			})
			.catch(function(error){
				console.error(error)
				self.hasError = true;
				if(error.response.status==404){
					self.error404=true;
				}
				if (error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	}
				instr.error(error.response.data);
				// self.appendLog('err', "K-GRID Service Response - Error returned from Knowledge Object: " + instr.arkID);
			})
	},
   }
	,created : function() {
		this.items=Drugs
	}
	, mounted:function(){
		var self=this
	},

	components:{
		applayout,
		itemtemplate,
		kogrid
		}
};
</script>
<style>
.v-autocomplete
  .v-autocomplete-input-group
    .v-autocomplete-input {
      font-size: 1.5em;
      padding: 10px 15px;
      box-shadow: none;
      border: 1px solid #157977;
      width: calc(100% - 32px);
      outline: none;
      background-color: #eee;
		}
    .v-autocomplete-selected
      .v-autocomplete-input {
        color: green;
        background-color: #f2fff2;
}
  .v-autocomplete-list{
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #157977;
	}
    .v-autocomplete-list-item{
      cursor: pointer;
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #157977;
      border-left: 1px solid #157977;
      border-right: 1px solid #157977;
		}
      /* &:last-child
        border-bottom none
      &:hover
        background-color #eee */
      abbr {
        opacity: 0.8;
        font-size: 0.8em;
        display: block;
        font-family: sans-serif;
			}
ul#kolisting li {
	margin-top:20px;
}
.kgl-search {
    display: inline-block;
    border: 1px solid #fff;
	border-radius: 10px;
    width: 46%;
    margin-left: 15px;
}
.kgl-count, .kgl-sort {
	line-height: 3em;
padding-right: 0px;
}
.kgl-search input {
    line-height: 2.8em;
    font-size: 14px;
    padding: 0px 0px 0px 16px;
    width:95%;
}
input[id$="datepicker"] {
    width: 150px;
}
#filterBtn {
  background-color: #fff;
  margin: 0px 0px 0px 0px;
  padding: 12px 0px 12px 0px;
  text-align: center;
	cursor: pointer;
	width: 130px;
	height: 45px;
}
#filterBtn.tall{
	height: 65px;
}
#filterBtn a {
  background-color: #fff;
  margin: 25px 0px 0px 0px;
  padding: 12px 10px 12px 0px;
  text-align: center;
	cursor: pointer;
	width: 80px;
	height: 45px;
	color: #666666;
}
#filterBtn a span {
	margin: 0px -10px 0px 10px;
}
i#filterdowniconimg
{
	margin-left:25px;
}
#filterpanel {
	background-color:#fff;
	margin: 0px 0px 0px 0px;
	padding: 25px;
}
.filterlist li, .filterlist button#clearAll{
	display:inline-block;
	background-color:#fff;
	margin:0px 20px 0px 0px;
	padding:12px 15px 12px 8px;
	height: 44px;
}
button#clearAll span {
	font-size:14px;
  border-bottom: 2px solid transparent;
	transition: border 0.5s ease;
}
.filterlist button#clearAll:hover span{
	border-bottom: 2px solid #0075bc;
}
.filterlist li:hover *{
	color: #0075bc;
}
.destroy {
	width:26px;
	height: 26px;
	border:1px solid #fff;
	border-radius: 100%;
	margin: -5px 5px 0px 0px;
	padding: 0px 0px 0px 0px;
	background-color: transparent;
}
.filterlist li label {
	display: inline-block;
	margin: 0px;
	text-align: center;
	vertical-align: top;
}
.filterlist button#clearAll {
	background-color: #e5e5e5;
	font-size: 12px;
	vertical-align: top;
	color: #0075bc;
}
#filterBtn a:hover, #filterBtn a:visited {
  color: #555555;
}
label {
  font-weight: 400;
  margin:10px 0px;
}
input[type=radio] {
  display: inline-block;
}
.bannercontent {
    margin-top: 0px;
    text-align: left;
    margin-bottom: 20px;
    margin: 0 auto;
    line-height: 1.5em;
    padding-top: 25px;
    background: transparent;
}
.bannercontent h1 {
	line-height:1.2em;
}
.kgl-newobj{
	width: 24px;
	height: 24px;
	position:absolute;
	top: 10px;
  right:0px;
  margin:0 auto;
  z-index:500;
}
.kgl-newobj span {
	position: absolute;
	top:2px;
	left:-190px;
	width:174px;
	opacity:1;
	border-bottom: 2px solid transparent;
	transition: border 0.5s ease;
}
.kgl-newobj:hover span{
	border-bottom: 2px solid #0075bc;
	cursor:pointer;
}
.kgl-newobj i {
	position: absolute;
	top: 6px;
	left:7.5px;
}
.row.filter {
	height: 36px;
}
.row.filterlabel {
	height: 28px;
}
.custom-control {
    position: relative;
    display: inline;
    padding-left: 1.5rem;
	margin-bottom: 1.5rem;
    cursor: pointer;
}
.custom-control-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}
.custom-control-description {
	position: absolute;
	padding-left: 28px;
	top: 11px;
	width: 200px;
	color: #0275bc;
}
.custom-control-indicator {
    position: absolute;
    top: 10px;
    left: 5px;
    display: block;
    width: 22px;
    height: 22px;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: 80% 80%;
    background-size: 80% 80%;
}
.custom-checkbox .custom-control-indicator {
  border-radius: 0px;
	border: 1px solid #0075bc;
}
.custom-checkbox .custom-control-input:disabled~.custom-control-indicator {
  background-color: #e5e5e5;
	border: 1px solid #555555;
}
.custom-checkbox .custom-control-indicator i {
	position:absolute;
	left:4px;
	top:3px;
}
.custom-radio .custom-control-indicator i{
	position:absolute;
	left:3px;
	top:2px;
}
.btnContent{
	padding: 3px 0px 0px 4px;
}
.custom-radio .custom-control-indicator {
  border-radius: 100%;
	border: 1px solid #0075bc;
}
.datepick>span {
	position: absolute;
	top: 4px;
	left: 20px;
}
.datepick p {
	position: absolute;
	top: 0px;
	left: 30px;
}
.filterBtnCol {
	width: 170px;
}
.expand-enter-active, .expand-leave-active {
  transition: all .3s linear;
  height: 270px;
  overflow: hidden;
	opacity:1;
}
.expand-enter, .expand-leave {
  height: 0;
	overflow:hidden;
  opacity: 0;
}
 span svg {
	 margin-left:2px;
	 margin-top:2px;
 }
</style>
