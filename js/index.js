	var home = Vue.extend({template:"#home"})
	var sale = Vue.extend({template:"#sale"})
	var shop = Vue.extend({
		template:"#shop",
		data:function(){
			return{
				goods:[]
			}
		},
		filters: {
				currency: function(value) {
					return '￥' + value;
				}
		},
		created(){
			for(var i=0; i<localStorage.length; i++){
//				console.log(localStorage.length)
				var k = localStorage.key(i);
				var v = JSON.parse(localStorage.getItem(k));
				this.goods.push(v);
			}
		},
		methods:{
			remove(k){
				localStorage.removeItem(this.goods[k].id);
				this.goods.splice(k,1)
			},
			plus(val){
				if(val.num<val.nums){
					val.num++;
				}
				
			},
			minus(val,k){
				if(val.num==1){
					var a = confirm("是否删除该商品");
					if(a==true){
						localStorage.removeItem(this.goods[k].id);
					    this.goods.splice(val,1)
					}
					
				}else{
					val.num--;
				}
				
			}
		},
		computed: {
				total: function() {
					var total = 0;
					for (var i in this.goods) {
						total += parseInt(this.goods[i].curr * this.goods[i].num);
					}
					
					return total;
				}
			}
	})
	var my = Vue.extend({template:"#my"})
	var one = Vue.extend({
		template:"#one",
		data:function(){
			return {
				lists:[],
			}
		},
		filters: {
				currency: function(value) {
					return '￥' + value;
				}
		},
		created: function() {
		        this.$http.get("data.json").then(function(res) {
					this.lists = JSON.parse(res.body);
					
	//				this.lists = JSON.parse(res.body).filter(function(item) {
	//					return item.id == 0;
	//				})
	//				console.log(this.lists)
				})
		},
		methods:{
			add(key){
				var kk=key;
				var key = this.lists[kk].id;
//				console.log(key)
				var mes = localStorage.getItem(key);
				if(mes){
					mes = JSON.parse(mes);
					if(mes.num<mes.nums){
						mes.num++;
					}
					mes = JSON.stringify(mes);
					localStorage.setItem(key,mes)
				}else{
					var val = JSON.stringify(this.lists[kk]);
					localStorage.setItem(key,val)
				}
				
			}
		}
	})
	var two = Vue.extend({template:"#two"})
	var three = Vue.extend({template:"#three"})
	var four = Vue.extend({template:"#four"})
	var five = Vue.extend({template:"#five"})
	var six = Vue.extend({template:"#six"})
	var seven = Vue.extend({template:"#seven"})
	var eight = Vue.extend({template:"#eight"})
	
	var router = new VueRouter({
		routes:[
		  {
		  	path:"/home",
		    component:home,
		    children:[
		      {path:"/home/one",component:one},
		      {path:"/home/two",component:two},
		      {path:"/home/three",component:three},
		      {path:"/home/four",component:four},
		      {path:"/home/five",component:five},
		      {path:"/home/six",component:six},
		      {path:"/home/seven",component:seven},
		      {path:"/home/eight",component:eight},
		      {path:"/home/",component:one}
		    ]
		  },
		  {path:"/sale",component:sale},
		  {path:"/shop",component:shop},
		  {path:"/my",component:my},
		  {path:"/",redirect:"/home"}
		]
	})
	var vue = new Vue({
		el:"#app",
		router:router
	})
