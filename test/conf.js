//protractor测试配置文件
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar',
  specs: ['*Spec.js']
};

