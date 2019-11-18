"use strict";
const { ServiceProvider } = require("@adonisjs/fold");
const path = require("path");

class ScaffoldProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("ScaffoldController", app => {
      return require(path.join(__dirname, "../src/ScaffoldController"));
    });

    this.app.singleton("ScaffoldModel", app => {
      return require(path.join(__dirname, "../src/ScaffoldModel"));
    });
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {}
}

module.exports = ScaffoldProvider;
