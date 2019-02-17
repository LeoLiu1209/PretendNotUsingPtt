// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
function createMenus(){
  var parent = chrome.contextMenus.create({
    "id": "parent",
    "title": "Pretend not using Ptt",
    "contexts": ["all"],
  })

  var launchChangeCSS = chrome.contextMenus.create({
    "id" : "launch",
    "title": "Launch app",
    "contexts": ['all'],
    "parentId" : parent
  })

  var pauseChangeCSS = chrome.contextMenus.create({
    "id": "Pause",
    "title" : "Pause app",
    "contexts": ['all'],
    "parentId": parent
  })
}

createMenus()


chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: 'ptt.cc'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
