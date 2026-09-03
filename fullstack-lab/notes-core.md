# 偏前端全栈 · 核心知识（面试口述版）

> 对应 JD：Vue + Java、MySQL、联调/CORS、Git/Maven/Linux  
> 定位：**2 年前端，独立做过 Vue3 + Spring Boot 闭环**，不要自称 3 年全栈。

---

## 1. 30 秒自我介绍（投全栈岗）

> 工作以 Vue 前端为主，网管类后台做过鉴权、权限、工程化。  
> 另外独立做过公司官网：Vue3 前台/后台 + Spring Boot 接口 + JWT，库表和 CRUD 我写过。  
> 后端深度停在常用业务层，SQL 能写联表和简单索引，部署能讲 jar + Nginx。

---

## 2. 分层（对着 BUSINESS 填文件名）

```text
浏览器页面 / 管理后台
    → axios（baseURL、token 头）
    → Controller（路径、方法、入参）
    → Service
    → Mapper / JDBC
    → MySQL 表
```

**你来填（C1–2 作业）：**

| 层 | 本机路径或类名 |
|----|----------------|
| 登录页 | |
| 请求封装 | |
| JWT 登录接口 | |
| JWT 过滤器 | |
| 某一个 CRUD（产品/新闻/方案） | |
| 对应表名 | |

面试一句：请求进 Controller，业务在 Service，SQL 在 Mapper，鉴权在 Filter。

---

## 3. JWT（C3–4）

和 Day 42 同一套，用 BUSINESS 举例：

1. 登录校验用户 → 签发 JWT → 返回前端  
2. 前端存（localStorage / cookie，说你项目实际用的）  
3. 之后请求 `Authorization: Bearer ...`  
4. 过滤器解析失败 → 401  

**跨域：** 开发 Vite 代理到后端，浏览器看起来同源；线上 Nginx 静态 + `/api` 反代，或后端配 CORS。  
**别混：** Cookie+Session 与 JWT 两套，说你项目用哪套。

---

## 4. MySQL（C5–8）

最低要求：

- `SELECT` + `WHERE` + `ORDER BY` + `LIMIT`  
- `INNER JOIN`：两表都有匹配才返回  
- `LEFT JOIN`：左表全保留，右表没有则 NULL  
- 索引：主键默认有；给 `WHERE` / `JOIN ON` 高频列加；**不要在索引列上套函数**  
- 慢查询：先 `EXPLAIN`，看有没有全表扫描 `type=ALL`

练习写在 `sql-practice.md`。

---

## 5. Maven（C9–10）

- `pom.xml`：依赖、Java 版本、打包插件  
- `mvn package` → `target/*.jar`  
- 面试：依赖冲突一般看树（`mvn dependency:tree`），知道即可不深挖

---

## 6. Linux + 部署（C11）

会这几条就够口述：

```text
ls / cd / pwd
ps aux | grep java
tail -f 日志
java -jar xxx.jar
```

典型结构：Nginx 提供前端 `dist`，`/api` 转到 `localhost:8080`。  
配置改完重启 Nginx / 重启 jar。

---

## 7. 和 40WEB 怎么分工讲

| 岗 | 先讲 | 再讲 |
|----|------|------|
| 偏前端全栈 | BUSINESS 闭环 | 40WEB 证明前端不是只会官网 CRUD |
| 纯 Vue 前端 | 40WEB | BUSINESS 作全栈加分 |
| H5/小程序 | 移动 demo | 40WEB |

---

## 8. 诚实边界（被追问时）

- 不是专职后端，没有高并发/分布式经验  
- 事务、锁、慢查询优化只到「看 EXPLAIN、加索引」  
- 没做过复杂运维，部署是 jar + Nginx 这一档
