import http from './http';

class api {
    constructor() {} 
    // 登录页面
    // 登出
    logout = params => {
        return http.post(`esmPLatform/system/user/logout.do`, params);
    };
    // 登录
    login = params => {
        return http.post(`auth-server/oauth/token`, params);
    };

    // 账户管理
    // 获取商家银行卡信息
    getBank = params => {
        return http.post(`pc-circle/account/cash/getBank.do`, params);
    };
    select = params => {
        return http.post(`/select`, params);
    };
    delete = params => {
        return http.post(`/delete`, params);
    };
    update = params => {
        return http.post(`/update`, params);
    };
    add = params => {
        return http.post(`/add`, params);
    };
}
export default new api;