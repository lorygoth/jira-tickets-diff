// ==UserScript==
// @name         Jira tickets diff
// @namespace    userscript@htnguyen.fr
// @version      0.1
// @description  Advanced jira's ticket history diff
// @author       lorygoth
// @match        https://*.atlassian.net/*
// @grant        none
// ==/UserScript==

import { observeChanges } from './services/dom-observer.ts';

(function () {
  observeChanges();
})();
