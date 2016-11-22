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

.controller('controlLogin', function($scope, $http, $auth, $state, $ionicPopup) {
  
  $scope.DatoTest="INICIAR SESIÓN";

  $scope.cargarCliente = function()
  {
    // $scope.correo = "cliente@cliente.com";
    $scope.nombre = "julia";
    $scope.clave = "987";
  };  
  $scope.cargarEmpleado = function()
  {
    // $scope.correo = "user@user.com";
    $scope.nombre = "roger";
    $scope.clave = "123";
  };  
  $scope.cargarAdmin = function()
  {
    // $scope.correo = "admin@admin.com";
    $scope.nombre = "admin";
    $scope.clave = "321";
  };


  if($auth.isAuthenticated())
  {
    $state.go("raiz");
  }
  else
  {
    
    $scope.Login=function(user, pass)
    {
      $scope.nombre = user;
      $scope.clave = pass;
      console.log("nombre: "+ $scope.nombre);
      console.log("clave: "+ $scope.clave);
      $auth.login({nombre:$scope.nombre, clave:$scope.clave})
      .then(function(respuesta)
      {
        console.log(respuesta);
        if($auth.isAuthenticated())
        {
          console.info($auth.isAuthenticated(), $auth.getPayload());
          $state.go("raiz");
        }
        else
        {
          $ionicPopup.alert({
            title: 'Error al ingresar los datos',
            template: 'No se encontró el usuario. Verifique los datos.'
             });
        }
      });
    };
    $scope.CargarFormulario=function()
    {
      $state.go("altaUser");
    };
  }
})



.controller('RootPageController', function($scope, $ionicSideMenuDelegate, $auth, $state) {

    if(!$auth.isAuthenticated()){
        $state.go("login");
    }

    })

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })

.controller('controlGrillaProducto', function($scope, $http, $state, $auth, FactoryProducto) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="**grilla**";


    $scope.esVisible={
        admin:false,
        empleado:false,
        cliente:false
        };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="empleado")
      $scope.esVisible.empleado=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;

    //FactoryProducto.mostrarapellido();

    FactoryProducto.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoProductos=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id){
      // console.log("borrar"+id);
       $http.delete('Datos/productos/'+id)
      .then(function(respuesta) {      
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

            $http.get('Datos/productos')
            .then(function(respuesta) {       

                   $scope.ListadoProductos = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoProductos= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });


  }
  }
  else
    $state.go("login");

})


.controller('controlGrillaUsuario', function($scope, $http, $location, $state, FactoryUsuario, $ionicActionSheet) {
    $scope.DatoTest="GRILLA USUARIO";


    $scope.guardar = function(usuario){

    console.log( JSON.stringify(usuario));
      $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
    }

    FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

    $scope.ListadoUsuarios=respuesta;

     
    });

    $scope.showActionsheet = function(usuario) {

      console.log("usuario a realizar: "+ usuario.id);
    
    $ionicActionSheet.show({
      titleText: 'Opciones de grilla',
      buttons: [
        { text: '<i class="icon ion-share"></i> Modificar' },
        // { text: '<i class="icon ion-arrow-move"></i> Move' },
      ],
      destructiveText: 'Borrar',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };


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

.service('ServicioProducto', function($http){ 
  var listado;

  this.retornarProductos = function(){

       return $http.get('Datos/productos')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };
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
})

.factory('FactoryProducto', function(ServicioProducto){
  var producto = {
   
    mostrarNombre:function(dato){
      
     return ServicioProducto.retornarProductos().then(function(respuesta){
       
        return respuesta;
      });
    },
    // mostrarapellido:function(){
    //   console.log("soy otra funcion de factory");
    // }
}
  return producto;

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
