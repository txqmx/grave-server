'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  //   const jwt = middleware.jwt();
  const grave = middleware.grave('front');
  router.get('/api/home/getHomeInfo', grave, controller.front.home.getHomeInfo);
  router.get('/api/home/getMasterInfo', grave, controller.front.home.getMasterInfo);
  router.get('/api/member/treeList', grave, controller.front.member.treeList);
  router.get('/api/member/list', grave, controller.front.member.findAll);
  router.get('/api/member/detail', grave, controller.front.member.findOne);
  router.get('/api/mate/detail', grave, controller.admin.mate.findOne);
  // router.get('/api/member/getLevel', grave, controller.front.member.getLevel);
};
