angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('RootPageController', function($scope, $ionicSideMenuDelegate) {
    })

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })


.controller('controlGrillaUsuario', function($scope, $http, $location, $state, FactoryUsuario) {
    $scope.DatoTest="GRILLA USUARIO";


    $scope.guardar = function(usuario){

    console.log( JSON.stringify(usuario));
      $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
    }

    FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

    $scope.ListadoUsuarios=respuesta;

     
    });


      // $http.get('Datos/usuarios')
      // .then(function(respuesta) {       

      //         $scope.ListadoUsuarioa = respuesta.data;
      //          console.log(respuesta.data);

      //       },function errorCallback(response) {
      //           $scope.ListadoUsuarioa= [];
      //           console.log( response);

      //     });
     
      // $http.get('PHP/nexo.php', { params: {accion :"traer"}})
      // .then(function(respuesta) {       

      //        $scope.ListadoUsuarios = respuesta.data.listado;
      //        console.log(respuesta.data);

      //   },function errorCallback(response) {
      //        $scope.ListadoUsuarios= [];
      //       console.log( response);     
      //  });

      $scope.Borrar=function(usuario){
        if(confirm("¿Desea eliminar el usuario seleccionado?"))
        //console.log("borrar"+usuario);
        $http.post("PHP/nexo.php",{datos:{accion :"borrar",usuario:usuario}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
             .then(function(respuesta) {       
                     //aca se ejetuca si retorno sin errores        
                     console.log(respuesta.data);
                        $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                        .then(function(respuesta) {       

                               $scope.ListadoUsuarios = respuesta.data.listado;
                               console.log(respuesta.data);

                          },function errorCallback(response) {
                               $scope.ListadoUsuarios= [];
                              console.log( response);
                              
                         });

              },function errorCallback(response) {        
                  //aca se ejecuta cuando hay errores
                  console.log( response);           
          });
      }// $scope.Borrar

})

.factory('FactoryUsuario', function(ServicioUsuario){
  var persona = {
   
    mostrarNombre:function(dato){
      
     return ServicioUsuario.retornarUsuarios().then(function(respuesta){
        console.log("estoy en el app.factory");
        return respuesta;
      });
    },
    mostrarapellido:function(){
     console.log("soy otra funcion de factory");
    }
}
  return persona;

})

.service('ServicioUsuario', function($http){
  var listado;

  this.retornarUsuarios = function(){

       return $http.get('Datos/usuarios')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
