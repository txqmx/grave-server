'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();

  // 管理员管理
  router.group({ prefix: '/api/admin', middlewares: [] }, router => {
    const controllerGroup = controller.admin;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
    router.post('/login', controllerGroup.login);
  });

  // 墓碑管理
  router.group({ prefix: '/api/grave', middlewares: [] }, router => {
    const controllerGroup = controller.grave;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
  });

  // 人员管理
  router.group({ prefix: '/api/member', middlewares: [] }, router => {
    const controllerGroup = controller.member;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
    router.get('/treeList', controllerGroup.treeList);
  });

  // 配偶管理
  router.group({ prefix: '/api/mate', middlewares: [] }, router => {
    const controllerGroup = controller.mate;
    router.post('/create', controllerGroup.create);
    router.get('/detail', controllerGroup.findOne);
    router.get('/list', controllerGroup.findAll);
    router.post('/update', controllerGroup.update);
    router.post('/delete', controllerGroup.delete);
  });
};
