"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw TypeError("The executor is not a function");
    }

    this._state = "pending";
    this._handlerGroups = [];

    this._internalResolve = function (someData) {
      if (this._state === "pending") {
        this._value = someData;
        this._state = "fulfilled";
        this._callHandlers();
      }
    };

    this._internalReject = function (myReason) {
      if (this._state === "pending") {
        this._value = myReason;
        this._state = "rejected";
        this._callHandlers();
      }
    };

    const that = this;
    this.resolve = function (data) {
      that._internalResolve(data);
    };

    this.reject = function (data) {
      that._internalReject(data);
    };

    executor(this.resolve, this.reject);

    this.then = function (s, e) {
      if (typeof s !== "function") s = null;
      if (typeof e !== "function") e = null;

      this._handlerGroups.push({ successCb: s, errorCb: e });

      if (this._state !== "pending") this._callHandlers(this._value);
    };

    this._callHandlers = function () {
      while (this._handlerGroups.length) {
        const currentHandler = this._handlerGroups.shift();
        if (this._state === "fulfilled") {
          currentHandler.successCb && currentHandler.successCb(this._value);
        } else {
          currentHandler.errorCb && currentHandler.errorCb(this._value);
        }
      }
    };

    this.catch = function (e) {
      this.then(null, e);
    };
  }
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
