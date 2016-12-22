package com.whut.work.user.service;

import com.whut.work.base.model.Page;
import com.whut.work.user.model.User;

import java.util.Map;

public interface IUserService {

    //获取分页列表
	public Page<User> getUserPageList(int currentPage, int pageSize) throws Exception;

    //删除
    public Map<String,Object> delete(Integer id) throws Exception;

}
