package com.whut.work.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.whut.work.base.model.Page;
import com.whut.work.login.service.ILoginService;
import com.whut.work.user.model.User;
import com.whut.work.user.service.IUserService;

@Controller
@RequestMapping("/login")
public class LoginCtrl {
	
	@Autowired
	private ILoginService loginService;
	@Autowired
	private IUserService userService;

	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> login(HttpServletRequest request,String username,String password){
		Map<String,Object> returnMap = new HashMap<String,Object>();
		
		try {
			Map<String,Object> map = loginService.login(username, password);
			//获取user实体
			Object object = map.get("value");
			if(object != null){
				User user = (User) object;
				HttpSession session = request.getSession();
				session.setAttribute("userId", user.getId());
			}
			returnMap.put("value", object);
			returnMap.put("message", map.get("message"));
			returnMap.put("success", map.get("success"));
		} catch (Exception e) {
			returnMap.put("message", "异常：登录失败!");
			returnMap.put("success", false);
			e.printStackTrace();
		}
		return returnMap;
	}
	
	@RequestMapping(value="/register",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> register(HttpServletRequest request,String username,String password){
		Map<String,Object> returnMap = new HashMap<String,Object>();
		
		try {
			Map<String,Object> map = loginService.register(username, password);
			//获取user实体
			Object object = map.get("value");
			if(object != null){
				User user = (User) object;
				HttpSession session = request.getSession();
				session.setAttribute("userId", user.getId());
			}
			returnMap.put("value", object);
			returnMap.put("message", map.get("message"));
			returnMap.put("success", map.get("success"));
		} catch (Exception e) {
			returnMap.put("message", "异常：注册失败!");
			returnMap.put("success", false);
			e.printStackTrace();
		}
		return returnMap;
	}
	
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(HttpServletRequest request,Integer id){
		Map<String,Object> returnMap = new HashMap<String,Object>();
		
		try {
			Map<String,Object> map = userService.delete(id);
			
			returnMap.put("message", map.get("message"));
			returnMap.put("success", map.get("success"));
		} catch (Exception e) {
			returnMap.put("message", "异常：操作失败!");
			returnMap.put("success", false);
			e.printStackTrace();
		}
		return returnMap;
	}
	
	@RequestMapping(value="/getUserPageList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getUserPageList(HttpServletRequest request,int currentPage,int pageSize){
		Map<String,Object> returnMap = new HashMap<String,Object>();
		
		try {
			Page<User> userPage = userService.getUserPageList(currentPage,pageSize);
			
			returnMap.put("page", userPage);
			returnMap.put("success", true);
		} catch (Exception e) {
			returnMap.put("message", "异常：获取失败!");
			returnMap.put("success", false);
			e.printStackTrace();
		}
		return returnMap;
	}
	
}
