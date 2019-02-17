// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
function createMenus(){
  var parent = chrome.contextMenus.create({
    "id": "parent",
    "title": "Pretend not using Ptt",
    "contexts": ["all"]
  })

  var launchChangeCSS = chrome.contextMenus.create({
    "id" : "launch",
    "title": "Launch app",
    "contexts": ['all'],
    "parentId" : parent,
  })

  var pauseChangeCSS = chrome.contextMenus.create({
    "id": "pause",
    "title" : "Pause app",
    "contexts": ['all'],
    "parentId": parent,
  })
}


chrome.contextMenus.onClicked.addListener(function (clickData) {
	if(clickData.menuItemId == "launch") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.insertCSS(
          tabs[0].id,
          {
            file: 'custom.css',
            allFrames: true
          });
    });
		console.log('launch')
  }

  if(clickData.menuItemId == "pause") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.insertCSS(
          tabs[0].id,
          {
            file: 'basic.css',
            allFrames: true
          });
    });
		console.log('pause')
	}
});

chrome.runtime.onInstalled.addListener(function() {
  createMenus()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: 'ptt.cc'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
