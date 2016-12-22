angular.module("mainapp",[])
.controller("maincontroller",function($scope){
	$scope.inputUsername = "";
	$scope.inputPassword = "";
    //登录
	$scope.login = function(){
		if(checkFirst() != false){
			login_ajax($scope.inputUsername,$scope.inputPassword);
		}else{
			alert("请将信息填写完整...");
		};
	};
	function checkFirst(){
		if($scope.inputUsername!=null && $scope.inputUsername!="" 
			&& $scope.inputPassword!=null && $scope.inputPassword!=""){
			return true;
		}else{
			return false;
		}
	};
	function login_ajax(username,password){
		this.username = username;
		this.password = hex_md5(password);
		$.ajax({
			type:"POST",
			url:"/login/login",
			data:{"username":this.username,"password":this.password},
			contentType:"application/x-www-form-urlencoded",
			dataType:"json",
			success:function(data){
				console.log(data);
                $scope.$apply(function(){
                    if(data.success == true && data.message == "登录成功"){
                        $scope.inputUsername = "";$scope.inputPassword = "";
                        alert("登录成功!");
                    }else if(data.success == false && data.message == "密码错误"){
                        $scope.inputUsername = "";$scope.inputPassword = "";
                        alert("密码错误!");
                    }
                });
			}
		});
	};
    //注册
	$scope.register = function(){
		if(checkFirst() != false){
            $scope.inputPassword = hex_md5($scope.inputPassword);
			$.ajax({
				type:"POST",
				url:"/login/register",
				data:{"username":$scope.inputUsername,"password":$scope.inputPassword},
				contentType:"application/x-www-form-urlencoded",
				dataType:"json",
				success:function(data){
					console.log(data);
                    $scope.$apply(function(){
                        if(data.success == true && data.message == "注册成功"){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            alert("注册成功!");
                        }else if(data.success == false && data.message == "该用户名已存在..."){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            alert("该用户名已被注册...");
                        }
                    });
                }
			});
		}else{
			alert("请将信息填写完整...");
		};
	};
})
.controller("userlistcontroller",function($scope){
	$scope.currentPage = 0;
	$scope.totalPage = 0;
	$scope.prevPage = "上一页";
	$scope.nextPage = "下一页";

	$scope.deleteOne = function(obj){
		$.ajax({
			type:"POST",
			url:"/login/delete",
			data:{"id":obj.id},
			contentType:"application/x-www-form-urlencoded",
			dataType:"json",
			success:function(data){
				//console.log(data);
				$scope.getUserPageList();
			}
		});
	};
	$scope.getUserPageList = function(){
		if($scope.currentPage == 0){
			this.currentPage = 1;
		}else{
			this.currentPage = $scope.currentPage;
		}
		$.ajax({
			type:"POST",
			url:"/login/getUserPageList",
			data:{"currentPage":this.currentPage,"pageSize":5},
			contentType:"application/x-www-form-urlencoded",
			dataType:"json",
			success:function(data){
				console.log(data);
                /**16-11-5 16:05
                 * angularjs  必须在$scope上下文中刷新数据才能更新视图
                 * 要用$scope.$apply(function(){
				 *	//更新数据
				 *	})
                 * 用$http服务的ajax获取可以直接修改数据，因为这个服务是在$scope上下文中的，但是jquery方法不是
                 */
				$scope.$apply(function(){
					$scope.userList = new Array();
					var obj = {};
					for(var temp in data.page.list){
						if(data.page.list[temp].isDelete == true){
							continue;//被删除的就不显示出来了
						}
						obj['id'] = data.page.list[temp].id;
						obj['username'] = data.page.list[temp].username;
						obj['password'] = data.page.list[temp].password;
						var datestr = new Date(parseInt(data.page.list[temp].createTime));
						var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
							//+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
							;
						obj['createTime'] = temstr;	//创建时间
						$scope.userList.push(obj);obj = {};
					}
					//分页相关更新
					$scope.currentPage = data.page.current;
					$scope.totalPage = data.page.total;
					if($scope.currentPage == 1){
						$("#btnid-prevpage").attr("disabled","disabled");
					}else{
						$("#btnid-prevpage").removeAttr("disabled");
					}
					if($scope.currentPage == $scope.totalPage){
						$("#btnid-nextpage").attr("disabled","disabled");
					}else{
						$("#btnid-nextpage").removeAttr("disabled");
					}
				});
			}
		});
	};
	$scope.makePagingList = function(obj){
		if(obj=="上一页"){
			if($scope.currentPage == 0){
				//nothing to do
			}else if($scope.currentPage == 1){
				alert("当前已经是第一页！");//其实并不会发生，因为disabled
			}else{
				$scope.currentPage = $scope.currentPage - 1; 
				$scope.getUserPageList();
			}
		}else if(obj=="下一页"){
			if($scope.currentPage == 0){
				//nothing to do
			}else if($scope.currentPage == $scope.totalPage){
				alert("当前已经是最后一页！");//其实并不会发生，因为disabled
			}else{
				$scope.currentPage = $scope.currentPage + 1; 
				$scope.getUserPageList();
			}
		}
	};
})
