<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>minissh-logsign</title>
<link rel="stylesheet" type="text/css" href="jsp/css/bootstrap.min.css">
<style type="text/css">
	body{
		padding:0px;
	}
	.maindiv{
		width:800px;
		height: 100px;
		margin:100px auto;
	}
	th,td{
		 text-align:center;
	}
</style>
</head>
<body ng-app="mainapp">

	<div class="maindiv" ng-controller="maincontroller">
		<form role="form" class="form-horizontal">
		  <div class="form-group form-inline">
		    <label for="username" class="col-sm-2 control-label">用户名：</label>
		    <div class="col-sm-3">
		    	<input ng-model="inputUsername" type="text" class="form-control" id="username" placeholder="请输入您的用户名">
		    </div>
		  </div>
		  <div class="form-group form-inline">
		    <label for="password" class="col-sm-2 control-label">密码：</label>
		    <div class="col-sm-3">
		   	 	<input ng-model="inputPassword" type="password" class="form-control" id="password" placeholder="请输入您的密码">
		    </div>
		  </div>
		  <div class="form-group">
		  	<div class="col-sm-offset-2 col-sm-10">
		  		<input type="button" ng-click="login()" class="btn btn-info" value="登录" />
		  		<input type="button" ng-click="register()" class="btn btn-success" value="注册" />
		  	</div>
		  </div>
		</form>	
	</div>
	
	<div ng-controller="userlistcontroller">
		<input type="button" ng-click="getUserPageList()" class="btn btn-warning" value="获取分页" />
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead ng-show="userList.length > 0">
				<th>用户名</th><th>密码</th><th>创建时间</th><th>操作</th>
			</thead>
			<tbody ng-show="userList.length > 0">
				<tr ng-repeat="item in userList">
					<td>{{item.username}}</td>
					<td>{{item.password}}</td>
					<td>{{item.createTime}}</td>
					<td><input ng-click="deleteOne(item)" type="button" class="btn btn-danger btn-sm" value="删除" /></td>
				</tr>
			</tbody>
			<tfoot>
                <span ng-show="userList.length > 0">
                    <input type="button" id="btnid-prevpage" ng-click="makePagingList(prevPage)" class="btn btn-default" value={{prevPage}} />&nbsp;
                    <input type="text" style="text-align:center;width:50px;" ng-model="currentPage" />&nbsp;
                    <input type="button" id="btnid-nextpage" ng-click="makePagingList(nextPage)"  class="btn btn-default" value="{{nextPage}}" />&nbsp;
                    <span>共&nbsp;</span>
                    <input type="text" readonly="readonly" style="text-align:center;width:50px;border:none;" ng-model="totalPage" />
                    <span>&nbsp;页</span>
                </span>
			</tfoot>
		</table>
	</div>

    <script src="https://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
    <script src="jsp/js/myjs/myngjs.js"></script>
    <script src="jsp/js/md5.js"></script>
</body>
</html>