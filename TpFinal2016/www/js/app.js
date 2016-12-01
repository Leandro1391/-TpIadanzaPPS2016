// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'satellizer', 'angularFileUpload', 'ui.router'])

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

  $authProvider.loginUrl = 'http://elmejorprecio.esy.es/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'http://elmejorprecio.esy.es/PHP/clases/Autentificador.php';
  // $authProvider.loginUrl = 'TpIadanzaPPS2016/TpFinal2016/www/PHP/clases/Autentificador.php';
  // $authProvider.signupUrl = 'TpIadanzaPPS2016/TpFinal2016/www/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'TokenLeandroPPS2016';
  $authProvider.tokenPrefix = 'TLPPS2016';
  $authProvider.authHeader = 'data';

  $stateProvider

  .state('raiz', {
                url : '/raiz',
                templateUrl : 'templates/raiz.html',
                controller : 'RootPageController'
  })

  .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html', 
        controller: 'controlLogin'
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
              templateUrl: 'templates/menuInicio.html',
              controller: 'controlMenuInicio'
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

  .state('Menu.grillaProducto', {
        url: '/grillaProducto',
        views: {
            'contenido': {
             templateUrl: 'templates/grillaProducto.html',
             controller: 'controlGrillaProducto'
            }
        }
    })

  .state('Menu.altaUsuario', {
        url: '/altaUsuario',
        views: {
            'contenido': {
             templateUrl: 'templates/altaUsuario.html',
             controller: 'controlAltaUsuario'
            }
        }
    })

  .state('Menu.altaProducto', {
        url: '/altaProducto',
        views: {
            'contenido': {
             templateUrl: 'templates/altaProducto.html',
             controller: 'controlAltaProducto'
            }
        }
    })

  .state('Menu.modificar', {
     url: '/modificar/{id}?:correo:nombre:clave:tipo:foto',
     params: {
        id: null,
        correo: null,
        nombre:null,
        clave:null,
        tipo:null,
        foto:null
     },
     views: {
      'contenido': { templateUrl: 'templates/altaUsuario.html',controller: 'controlModificacion' },
    }
  })

  .state('Menu.modificarProducto', {
     url: '/modificarProducto/{id}?:nombre:local:localidad:direccion:precio:codbar:foto:fecha',
     params: {
        id: null,
        nombre:null,
        local:null,
        localidad:null,
        direccion:null,
        precio:null,
        codbar:null,
        foto:null,
        fecha:null
     },
     views: {
      'contenido': { templateUrl: 'templates/altaProducto.html',controller: 'controlModificarProducto' },
    }
  })

  .state('Menu.detallesProducto', {
     url: '/detallesProducto/{id}?:nombre:local:localidad:direccion:precio:codbar:foto:fecha',
     params: {
        id: null,
        nombre:null,
        local:null,
        localidad:null,
        direccion:null,
        precio:null,
        codbar:null,
        foto:null,
        fecha:null
     },
     views: {
      'contenido': { templateUrl: 'templates/detalleProducto.html',controller: 'controlModificarProducto' },
    }
  })

  .state('Menu.mapa', {
        url: '/mapa/{id}?:local:localidad:direccion',
        params: {
        id: null,
        local:null,
        localidad:null,
        direccion:null
        },
        views: {
            'contenido': {
             templateUrl: 'templates/mapa.html',
             controller: 'controlMapa'
            }
        }
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.detalles', {
      url: '/detalles',
      views: {
        'tab-detalles': {
          templateUrl: 'templates/detalles.html',
          controller: 'controlDetalles'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'ControladorLinterna'
      }
    }
  })

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
  $urlRouterProvider.otherwise('/login');
});
