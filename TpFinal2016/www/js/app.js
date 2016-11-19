// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'TokenLeandroPPS2016';
  $authProvider.tokenPrefix = 'TLPPS2016';
  $authProvider.authHeader = 'data';

  $stateProvider

  .state('raiz', {
                url : '/raiz',
                templateUrl : 'templates/raiz.html',
                controller : 'RootPageController'
  })

  .state('Menu', {
     url : '/Menu',
        templateUrl : 'templates/menuAbst.html',
        abstract : true
    })


  .state('Menu.inicio', {
      url: '/inicio',
      views: {
          'contenido': {
              templateUrl: 'templates/MenuInicio.html'
          }
      }
  })


  .state('Menu.grillaUsuario', {
        url: '/grillaUsuario',
        views: {
            'contenido': {
             templateUrl: 'templates/grillaUsuario.html',
             controller: 'controlGrillaUsuario'
            }
        }
    })

  // .state('Menu.dos', {
  //               url: '/dos',
  //               views: {
  //                 'contenido': {
  //                  templateUrl: 'MenuDos.html',
  //                  controller: 'ControladorToast'
  //               }
  //         }
  //     })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/raiz');
});
