'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();
  const grave = middleware.grave();
  const auth = middleware.auth();

  router.post('/api/admin/login', controller.admin.admin.login);
  router.post('/api/admin/file/upload', grave, controller.admin.file.upload);
  router.get('/api/admin/user/detail', jwt, controller.admin.admin.findOne);

  // 管理员管理
  router.group({ prefix: '/api/admin/user', middlewares: [ jwt, auth ] }, router => {
    const controllerGroup = controller.admin.admin;
    router.post('/create', controllerGroup.create);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
  });


  // 墓碑管理
  router.group({ prefix: '/api/admin/grave', middlewares: [ jwt ] }, router => {
    const controllerGroup = controller.admin.grave;
    router.post('/create', controllerGroup.create);
    router.post('/createGrave', controllerGroup.createGrave);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
    router.get('/getQrcode', controllerGroup.getQrcode);
  });

  // 人员管理
  router.group({ prefix: '/api/admin/member', middlewares: [ jwt, grave ] }, router => {
    const controllerGroup = controller.admin.member;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
    router.get('/treeList', controllerGroup.treeList);
  });

  // 配偶管理
  router.group({ prefix: '/api/admin/mate', middlewares: [ jwt, grave ] }, router => {
    const controllerGroup = controller.admin.mate;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
  });

  // 页面管理
  router.group({ prefix: '/api/admin/page', middlewares: [ jwt, grave ] }, router => {
    const controllerGroup = controller.admin.page;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
    router.post('/changeStatus', controllerGroup.changeStatus);
  });

  // 模板管理
  router.group({ prefix: '/api/admin/pageTemplate', middlewares: [ jwt, auth ] }, router => {
    const controllerGroup = controller.admin.pageTemplate;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
  });
};
