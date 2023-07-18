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

function getbaseAction(router, controller) {
  actionObject.forEach(item => {
    router.post(`/api/${item}/create`, controller[item].create);
    router.get(`/api/${item}/detail`, controller[item].findOne);
    router.get(`/api/${item}/list`, controller[item].findAll);
    router.post(`/api/${item}/update`, controller[item].update);
    router.post(`/api/${item}/delete`, controller[item].delete);
  });
}

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  getbaseAction(router, controller);

};
