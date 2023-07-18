'use strict';

const actionObject = [
  'admin',
  'grave',
  'member',
  'mate',
  'article',
  'media',
  'photo',
];

function getbaseAction(router, controller, jwt) {
  actionObject.forEach(item => {
    router.post(`/api/${item}/create`, jwt, controller[item].create);
    router.get(`/api/${item}/detail`, jwt, controller[item].findOne);
    router.get(`/api/${item}/list`, jwt, controller[item].findAll);
    router.post(`/api/${item}/update`, jwt, controller[item].update);
    router.post(`/api/${item}/delete`, jwt, controller[item].delete);
  });
}

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();
  getbaseAction(router, controller, jwt);
  router.post('/api/admin/login', controller.admin.login);

};
