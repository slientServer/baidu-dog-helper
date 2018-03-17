chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: 'index.html' }, (tab) => {
    chrome.tabs.onUpdated.addListener(function (tabId) { 
      if(tab.id === tabId){
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            for(var key in request) {
              window.localStorage.setItem(key, request[key]);
            }
          }
        );

        chrome.tabs.query({
          url: '*://*.ivery.one/*'
        }, (res) => {
          chrome.tabs.executeScript(res[0].id, {
            code: 'chrome.runtime.sendMessage({lang: window.localStorage.getItem("locale"),' + 
            'token: window.localStorage.getItem("token"),' +
            'uid: window.localStorage.getItem("uid")}, function(response) {});'
          });    
        });        
      }
    }); 
  });
});
