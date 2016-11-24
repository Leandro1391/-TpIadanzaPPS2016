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


//////////////////////////////////////////////////////
///////////////////CONTROLLER DEL MENÚ///////////////
/////////////////////////////////////////////////////

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

.controller('NavController', function($scope, $ionicSideMenuDelegate, $auth, $state) {


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

    $scope.Logout=function()
    {
      console.log("estoy adentro del logout");
      $auth.logout()
      .then(function()
      {
        $state.go("login");
        $route.reload();
      });
    };

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
 })

.controller('controlGrillaProducto', function($scope, $http, $state, $auth, FactoryProducto) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="Grilla Producto";


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

.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader, $auth, $ionicPopup)
{

  if($auth.isAuthenticated())
  {
  $scope.usuario={};
  $scope.DatoTest="Modificar Usuario";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;
  $scope.usuario.id=$stateParams.id;
  $scope.usuario.correo=$stateParams.correo;
  $scope.usuario.nombre=$stateParams.nombre;
  $scope.usuario.clave=$stateParams.clave;
  $scope.usuario.tipo=$stateParams.tipo;
  $scope.usuario.foto=$stateParams.foto;


  $scope.cargarfoto=function(nombrefoto){
      var direccion="imagenes/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.usuario.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",usuario:$scope.usuario}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);

          $state.go("Menu.grillaUsuario");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


      $scope.Guardar=function(usuario)
      {

          var confirmPopup = $ionicPopup.confirm({
                title: 'Guardando Usuario',
                template: '¿Está seguro que desea guardar los datos del usuario editado?'
          });

          confirmPopup.then(function(res) {
              if(res) {
                  console.log('You are sure');
                  console.log("estoy en el guardar function");
                  if($scope.uploader.queue[0].file.name!='pordefecto.png')
                  {
                      var nombreFoto = $scope.uploader.queue[0]._file.name;
                      $scope.usuario.foto=nombreFoto;
                  }
              $scope.uploader.uploadAll();
              } else 
                console.log('You are not sure');
             });
      }

  }else{
      $state.go("login");
  }
  
})

///////////////////////////////////////////////////////////
/////////CONTROLLER DE GRILLA USUARIO//////////////////////
//////////////////////////////////////////////////////////

.controller('controlGrillaUsuario', function($scope, $http, $location, $state, $auth, FactoryUsuario, $ionicActionSheet, $ionicPopup) {
    
  if($auth.isAuthenticated()){

      $scope.DatoTest="Grilla Usuario";


    $scope.$on('$ionicView.beforeEnter', function(){
        FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

            $scope.ListadoUsuarios=respuesta;
 
        });
    });



    $scope.showActionsheet = function(usuario) {

    
    $ionicActionSheet.show({
      titleText: 'Opciones de Grilla Usuario',
      buttons: [
        { text: '<i class="icon ion-edit"></i> Modificar' },
        // { text: '<i class="icon ion-arrow-move"></i> Move' },
      ],
      destructiveText: 'Borrar',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        $state.go('Menu.modificar',{id:usuario.id, correo:usuario.correo, nombre:usuario.nombre, clave:usuario.clave, tipo:usuario.tipo, foto:usuario.foto});
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        console.log("usuario a eliminar: "+ usuario.id);


           // A confirm dialog
       // $scope.showConfirm = function() {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Eliminar Usuario: '+ usuario.nombre,
           template: '¿Está seguro que desea eliminar al usuario '+ usuario.nombre+'?'
         });

         confirmPopup.then(function(res) {
           if(res) {
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
             console.log('You are sure');
           } else {
             console.log('You are not sure');
           }
         });
       // };

       
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

  }else
  $state.go("login");

    
})


.controller('controlAltaUsuario', function($scope, $http ,$state, FileUploader, cargadoDeFoto, $auth, $ionicPopup) {

  if($auth.isAuthenticated())
  {
        $scope.DatoTest="Alta Usuario";

        $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
        $scope.uploader.queueLimit = 1;

      //inicio las variables
        $scope.usuario={};
        $scope.usuario.correo= "pepe@pepe.com" ;
        $scope.usuario.nombre= "pepe" ;
        $scope.usuario.clave= "9876" ;
        $scope.usuario.tipo= "empleado" ;
        $scope.usuario.foto="pordefecto.png";
        
        cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);
       

        $scope.Guardar=function(usuario){

            var confirmPopup = $ionicPopup.confirm({
                 title: 'Guardando Usuario',
                template: '¿Está seguro que desea guardar el usuario '+ usuario.nombre+'?'
               });

               confirmPopup.then(function(res) {
                 if(res) {

                   console.log('You are sure');
                    console.log($scope.uploader.queue);
                  //debugger;
                  if($scope.uploader.queue[0].file.name!='pordefecto.png')
                  {
                    var nombreFoto = $scope.uploader.queue[0]._file.name;
                    $scope.usuario.foto=nombreFoto;
                  }
                  $scope.uploader.uploadAll();
                    console.log("usuario a guardar:");
                    console.log(usuario);
                 } else {
                   console.log('You are not sure');
                 }
               });
            };

         $scope.uploader.onSuccessItem=function(item, response, status, headers)
        {

            $http.post('Datos/usuarios',$scope.usuario)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("Menu.inicio");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });

          //alert($scope.persona.foto);
            // $http.post('PHP/nexo.php', { datos: {accion :"insertar",usuario:$scope.usuario}})
            //   .then(function(respuesta) {       
            //      //aca se ejetuca si retorno sin errores        
            //    console.log(respuesta.data);
            //    $state.go("Menu.inicio");

            // },function errorCallback(response) {        
            //     //aca se ejecuta cuando hay errores
            //     console.log( response);           
            //   });
          // console.info("Ya guardé el archivo.", item, response, status, headers);
        };
        }
  else{
        $state.go("login");
  }

})

//////////////////////////////////////////////////
//////////////////FACTORY////////////////////////
////////////////////////////////////////////////

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


.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,Uploader){
        var direccion="imagenes/"+nombrefoto;  
        $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(Uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              Uploader.queue.push(dummy);
         });
    }
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
