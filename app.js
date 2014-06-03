var home = $r.package("home");

home.skins(
        {skinClass:'MainNavigatorSkin', skinURL:"appSkin.html"}
);

var main = $r.package("main");

main.skins(
        {skinClass:'MainContainerSkin', skinURL:"/views/main/skins/MainContainerSkin.html"}
);


'use strict';

$r.skins(
        {skinClass:'AppSkin', skinURL:"appSkin.html"},
        {skinClass:'AppSkinSmallScreen', skinURL:"appSkinSmallScreen.html"}
);


$r.Application('RamaJSWebsite', function()
{

    //this.skinClass = "$r.AppSkin";
    this.init = function(){
        this.super.init();
        this.skinClass = "$r.AppSkin";
        window.addEventListener("resize", $r.bindFunction(handleResize, this))
    }

    this.initialize = function(){
        this.super.initialize();
        var event = new $r.Event("resize");
        window.dispatchEvent(event.event);

    }


    this.hamBurgerIcon = null;
    this.mainNavigator = null;

    this.mainContainer = null;

    this.skinParts = [{id:'mainContainer', required:true},
        {id:'testButton', required:true},
        {id:'mainNavigator', required:true},
        {id:'hamBurgerIcon', required:false}];

    this.mainViewsConfig = [
        {
            viewid:"homeView",
            viewName:"Home",
            iconClass:"home-icon"
        },

        {
            viewid:"documentationView",
            viewName:"Documentation",
            iconClass:"doc-icon"
        },

        {
            viewid:"tutorialsView",
            viewName:"Tutorials",
            iconClass:"home-icon",
            subViews:[
                {
                    viewid:"helloWorld",
                    viewName:"Hello World and much more",
                },
                {
                    viewid:"todoApp",
                    viewName:"Write a TODO App",
                }
            ]
        }
    ];

    this.partAdded = function(partName, instance){
        this.super.partAdded(partName, instance);

        if (instance === this.testButton) {
            this.testButton.addEventListener('click', $r.bindFunction(handleTestButtonClick, this));

            //testingEventDispatcher.addEventListener('myEvent', handleMyEvent);
            //handleMyEvent.bind(this);
        }


        if(instance === this.mainNavigator)
        {
            this.mainNavigator.menuDataProvider = this.mainViewsConfig;
        }

        if(instance === this.hamBurgerIcon)
        {
            this.hamBurgerIcon.addEventListener("click", $r.bindFunction(handleHamburgerIconClicked, this))
        }

    }

    function handleResize(event){
      if(this[0].offsetWidth < 1200)
      {
          this.skinClass = "$r.AppSkinSmallScreen";
      }
      else
      {
          this.skinClass = "$r.AppSkin";
      }
    }

    function handleTestButtonClick(clickEvent) {

        if(this.skinClass === "$r.AppSkin")
        {
            this.skinClass = "$r.AppSkinSmallScreen";
        }
        else
        {
            this.skinClass = "$r.AppSkin";
        }
    };

    function handleHamburgerIconClicked(event){

        this.mainContainer.toggleLHSContent();
    }

});







main.Class("MainContainer").extends("Component")(function(){

    this.skinClass = "main.MainContainerSkin";
    this.mainMenuLargeScreen = null;
    this.mainMenuSmallScreen = null;

    this.skinParts = [{id:'mainMenuLarge', required:false},
        {id:'mainMenuSmall', required:false}]

    var _menuDataProvider = null;

    this.get("menuDataProvider", function(){
        return _menuDataProvider;
    })

    this.set("menuDataProvider", function(value){

        _menuDataProvider = value;
    })

    this.partAdded = function(partName, instance){
        this.super.partAdded(partName, instance);

        if(instance === this.mainMenuLarge)
        {
            this.mainMenuLargeScreen.dataProvider = _menuDataProvider;
        }

        if(instance === this.mainMenuSmall)
        {
            this.mainMenuSmallScreen.dataProvider = _menuDataProvider;
        }

    }

    
})

main.Class("MainNavigator").extends("Component")(function(){

    this.mainMenuLargeScreen = null;
    this.mainMenuSmallScreen = null;

    this.skinParts = [{id:'mainMenuLarge', required:false},
        {id:'mainMenuSmall', required:false}]

    var _menuDataProvider = null;

    this.get("menuDataProvider", function(){
        return _menuDataProvider;
    })

    this.set("menuDataProvider", function(value){

        _menuDataProvider = value;
    })

    this.partAdded = function(partName, instance){
        this.super.partAdded(partName, instance);

        if(instance === this.mainMenuLarge)
        {
            this.mainMenuLargeScreen.dataProvider = _menuDataProvider;
        }

        if(instance === this.mainMenuSmall)
        {
            this.mainMenuSmallScreen.dataProvider = _menuDataProvider;
        }

    }

    
})

main.Class("MainNavigatorItemRenderer").extends("Component")(function(){

    
})


