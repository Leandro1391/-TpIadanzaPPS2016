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

  $scope.$on('$ionicView.beforeEnter', function(){

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

  });

  
})


.controller('RootPageController', function($scope, $ionicSideMenuDelegate, $auth, $state, $window) {

    $scope.datos = {};

    $scope.datos.pantallaAlto = $window.innerHeight;

    $scope.datos.pantallaAncho = $window.innerWidth;

})

.controller('controlMenuInicio', function($scope, $auth, $window, $state){

  if($auth.isAuthenticated()){
    $scope.datos = {};

    $scope.datos.pantallaAlto = $window.innerHeight;

    $scope.datos.pantallaAncho = $window.innerWidth;
  }else
    $state.go("login");

})

.controller('controlDetalles', function($scope, $cordovaDevice, $ionicPlatform){

  $ionicPlatform.ready(function () {

    //   function mostrar_objeto(obj){
    //   for (var propiedad in obj) {
    //     document.write(propiedad+": "+obj[propiedad] + "<br />")
    //   }
    // }

    // mostrar_objeto($cordovaDevice);

    // console.log("device: "+$cordovaDevice.getDevice());

    $scope.device = $cordovaDevice.getDevice();

    $scope.manufacturer = $cordovaDevice.getManufacturer();

    $scope.cordova = $cordovaDevice.getCordova();

    $scope.model = $cordovaDevice.getModel();

    $scope.platform = $cordovaDevice.getPlatform();

    $scope.uuid = $cordovaDevice.getUUID();

    $scope.version = $cordovaDevice.getVersion();

  }, false);

})

.controller('controlMapa', function($scope, $auth, $state, $cordovaGeolocation, $ionicPlatform, $stateParams, $cordovaVibration, $ionicPopup){

  if($auth.isAuthenticated()){

      $scope.DatoTest="Ubicación";
   
      // alert("estoy en el mapa de google");

      $scope.$on('$ionicView.beforeEnter', function(){

          $ionicPlatform.ready(function(){

              id=$stateParams.id;
              nombre=$stateParams.nombre;
              localidad=$stateParams.localidad;
              direccion=$stateParams.direccion;

              lugar = direccion +" , "+ localidad +", Buenos Aires, Argentina";

              navigator.geolocation.getCurrentPosition(success, error);
      var divMap = document.getElementById("map");

      function error(){
        alert("Hubo un problema al solicitar los datos: "+error);
      }

      function success(respuesta){
        //mostrar_objeto(respuesta.coords);
        var lat = respuesta.coords.latitude;
        var long = respuesta.coords.longitude;

        var myLatLong = new google.maps.LatLng(lat, long);

        var mapOptions = {
          zoom: 12,
          center: myLatLong,
          zoomControl: false,
          streetViewControl: false
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var serviceDistance = new google.maps.DistanceMatrixService();

        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        calcularDuracionyTiempo(serviceDistance);
        document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        calcularDuracionyTiempo(serviceDistance);
        });



        function calcularDuracionyTiempo(serviceDistance) {

                 var selectedMode = document.getElementById('mode').value;

                serviceDistance.getDistanceMatrix(
                {
                    origins: [myLatLong],
                    destinations: [lugar],
                    // travelMode: google.maps.TravelMode.DRIVING,
                    travelMode: google.maps.TravelMode[selectedMode],
                    avoidHighways: false,
                    avoidTolls: false
                }, 
                callback
                );

        function callback(response, status) {
            var orig = "";//document.getElementById("orig"),
            var dest = "";//document.getElementById("dest"),
            // var distancia = document.getElementById("distancia");
            var distanciaDiv = document.getElementById('distancia');
            var duracionDiv = document.getElementById('duracion');
            distanciaDiv.innerHTML = '';
            duracion.innerHTML = '';

            

            if(status=="OK") {
                orig.value = response.destinationAddresses[0];
                dest.value = response.originAddresses[0];
                distanciaDiv.innerHTML = response.rows[0].elements[0].distance.text;
                duracionDiv.innerHTML = response.rows[0].elements[0].duration.text;
                var numero = response.rows[0].elements[0].distance.text;
                var a = parseFloat(numero);
                if (a < 0.1 || a == 0.1) {
                    $cordovaVibration.vibrate(1000);
                    $ionicPopup.alert({
                      title: 'Aviso!!',
                      template: 'Se encuentra a menos de 100 mts del local'
                   });
                }
                // alert(numero);
                // if (typeof numero == 'string') {
                //   alert("es un string");
                // }else
                //   alert("no es un string");
                console.log("distancia: " + response.rows[0].elements[0].distance.text);
                console.log("tiempo: " + response.rows[0].elements[0].duration.text);
                console.log("distancia:"+ distancia);
                // distanciaDiv.innerHTML = distancia;
            } else {
                alert("Error: " + status);
            }
          }

      }


        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
              var selectedMode = document.getElementById('mode').value;
              directionsService.route({
                origin: myLatLong,  // Haight.
                destination: String(lugar),  // Ocean Beach.
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode[selectedMode]
              }, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });
        }

    }


          })

      });



  }else
    $state.go("login");

})

.controller('NavController', function($scope, $ionicSideMenuDelegate, $auth, $state) {

    if($auth.isAuthenticated())
    {

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
      console.log("estoy dentro del logout");
      $auth.logout()
      .then(function()
      {
        $state.go("login");
      });
    };

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

    }else
      $state.go("login");

 })


.controller('controlAltaProducto', function($scope, $http, $sce ,$state, $auth, FileUploader, $ionicPlatform, $cordovaCamera, $ionicPopup, $cordovaFileTransfer, $cordovaBarcodeScanner) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="Alta Producto";

    var defaultHTTPHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    $http.defaults.headers.post = defaultHTTPHeaders;

    // $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});

        $scope.esVisible={
        admin:false,
        user:false,
        cliente:false
        };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;

    $ionicPlatform.ready(function() {

        $scope.scanBarCode = function() {

            // alert("estoy en el scan()");

          $cordovaBarcodeScanner.scan().then(function(imageData){

            // alert("Codigo: "+imageData.text);
            $scope.producto.codbar=imageData.text;

            // cordova.InAppBrowser.open(imageData.text, '_blank', 'location=yes');
            //console.log("format" + imageData.format)

          }, function(error){
            console.log("un error ha sucedido" + error);
          });

        }

    });

    $ionicPlatform.ready(function() {
        $scope.enabled=true;

        $scope.upload = function() {

            var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            cameraDirection:0,
            correctOrientation:true
        };

            $cordovaCamera.getPicture(options).then(function(imageData){
                $scope.producto.foto = imageData;
                // alert("nombre de la foto: " + $scope.producto.foto);
            }, function(error){
                $ionicPopup.alert({
            title: 'Error',
            template: 'error al sincronizar: '+error
             });

            });



            // $cordovaFileTransfer.upload("http://elmejorprecio.esy.es/imagenes", imageData, options).then(function(result) {
            //     console.log("SUCCESS: " + JSON.stringify(result.response));
            //   }, function(err) {
            //     console.log("ERROR: " + JSON.stringify(err));
            //   }, function (progress) {
            //     // constant progress updates
            // });

        }

        $scope.subirFoto=function(){

          alert("estoy en la funcion subirFoto");

            var opciones = {
            fileKey: "avatar",
            fileName: "image.jpg",
            chunkedMode: false,
            mimeType: "image/jpeg"
            };

            $cordovaFileTransfer.upload("http://elmejorprecio.esy.es/imagenes", imageData, opciones)
            .then(function(result) {
              alert("se ha subido el archivo");
                }, function(err) {
                  alert("Error: "+ err);
                }, function (progress) {
                  // constant progress updates
            });
        }

         
    }, false);



      $scope.producto={
        nombre:"Product New",
        local:"Esso",
        localidad:"Wilde",
        direccion:"Av las Flores 577",
        precio:"20.45",
        codbar:"7756543214",
        foto:"productopordefecto.jpg"
      };

      $scope.producto.fecha=new Date();

      var dd = $scope.producto.fecha.getDate();
      var mm = $scope.producto.fecha.getMonth()+1; //Enero es 0!
      
      var yyyy = $scope.producto.fecha.getFullYear();
      
      $scope.producto.fecha= dd+'/'+mm+'/'+yyyy;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;

          $scope.Guardar=function(){

              // var urlCompleta = 'http://elmejorprecio.esy.es/Datos/productos';
              // var postUrl = $sce.trustAsResourceUrl(urlCompleta);
              ///////////////////SLIM/////////////

              
                 var confirmPopup = $ionicPopup.confirm({
                   title: 'Guardando Producto',
                   template: '¿Seguro que deseas guardar el producto?'
                 });

                 confirmPopup.then(function(res) {
                   if(res) {
                     console.log('You are sure');
                     $http.post('http://elmejorprecio.esy.es/Datos/productos',$scope.producto)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               // alert("se guardó el producto");
                               $state.go("Menu.inicio");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              alert("hubo un error: "+response.data+"/status: "+response.status+"/config: "+response.config+"/header: "+response.header);
                              console.log( response);           
                          });
                   } else {
                     console.log('You are not sure');
                   }
                 });

         }

  }else{$state.go("login");}

})


////////////////////////////////////////////////////////
////////////////CONTROLLER GRILLA PRODUCTO////////////////
/////////////////////////////////////////////////////////

.controller('controlGrillaProducto', function($scope, $http, $state, $auth, FactoryProducto, $ionicActionSheet, $ionicPopup, $ionicPlatform, $cordovaBarcodeScanner) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="Grilla Producto";


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


    $scope.$on('$ionicView.beforeEnter', function(){

        FactoryProducto.mostrarNombre("otro").then(function(respuesta){

            $scope.ListadoProductos=respuesta;
     
       });
    });

    // $scope.mifiltro={};


    $ionicPlatform.ready(function() {

        $scope.scanBarCode = function() {

            // alert("estoy en el scan()");

          $cordovaBarcodeScanner.scan().then(function(imageData){

            // alert("Codigo: "+imageData.text);
            $scope.mifiltro=imageData.text;

            // cordova.InAppBrowser.open(imageData.text, '_blank', 'location=yes');
            //console.log("format" + imageData.format)

          }, function(error){
            console.log("un error ha sucedido" + error);
          });

        }

    });


    $scope.onTouch=function(producto){

      if($scope.esVisible.cliente){
        // console.log("Estoy adentro de onTouch con el producto id: "+ producto.id);
            
            $ionicActionSheet.show({
              titleText: 'Opciones',
              buttons: [
                { text: '<i class="icon ion-information-circled"></i> Más detalles' },
                { text: '<i class="icon ion-navigate"></i> ¿Cómo llegar?' },
              ],
              cancelText: 'Cancel',
              cancel: function() {
                console.log('CANCELLED');
              },
              buttonClicked: function(index) {
                console.log('BUTTON CLICKED', index);
                if(index == 0){
                          $state.go('Menu.detallesProducto',{id:producto.id, nombre:producto.nombre, local:producto.local, localidad:producto.localidad, direccion:producto.direccion, precio:producto.precio, codbar:producto.codbar, foto:producto.foto, fecha:producto.fecha});
                }else
                {
                  $state.go('Menu.mapa',{id:producto.id, local:producto.local, localidad:producto.localidad, direccion:producto.direccion});
                }
                return true;
              },
            });
          


      }

      // $state.go('Menu.modificarProducto',{id:producto.id, nombre:producto.nombre, local:producto.local, localidad:producto.localidad, direccion:producto.direccion, precio:producto.precio, codbar:producto.codbar, foto:producto.foto, fecha:producto.fecha});
        //aca va para el cliente una action sheet que diga más detalles o ¿como llegar?
    }


    $scope.showActionsheet = function(producto) {

    
    $ionicActionSheet.show({
      titleText: 'Opciones de Grilla Producto',
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
        $state.go('Menu.modificarProducto',{id:producto.id, nombre:producto.nombre, local:producto.local, localidad:producto.localidad, direccion:producto.direccion, precio:producto.precio, codbar:producto.codbar, foto:producto.foto, fecha:producto.fecha});
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        console.log("producto a eliminar: "+ producto.id);


           // A confirm dialog
       // $scope.showConfirm = function() {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Eliminar producto: '+ producto.nombre,
           template: '¿Está seguro que desea eliminar al producto '+ producto.nombre+'?'
         });

         confirmPopup.then(function(res) {
           if(res) {
               $http.delete('http://elmejorprecio.esy.es/Datos/productos/'+producto.id)
                .then(function(respuesta) {      
               //aca se ejetuca si retorno sin errores        
               console.log(respuesta.data);

             $http.get('http://elmejorprecio.esy.es/Datos/productos')
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

  }else
    $state.go("login");

})

.controller('controlModificarProducto', function($scope, $http, $state, $stateParams, FileUploader, $auth, $ionicPopup, $ionicPlatform, $cordovaBarcodeScanner){

    if ($auth.isAuthenticated()) {
      $scope.DatoTest="Modificar Producto";

      $scope.producto={
        id:$stateParams.id,
        nombre:$stateParams.nombre,
        local:$stateParams.local,
        localidad:$stateParams.localidad,
        direccion:$stateParams.direccion,
        precio:$stateParams.precio,
        codbar:$stateParams.codbar,
        foto:$stateParams.foto,
        fecha:$stateParams.fecha
      }

      $ionicPlatform.ready(function() {

        $scope.scanBarCode = function() {

            // alert("estoy en el scan()");

          $cordovaBarcodeScanner.scan().then(function(imageData){

            // alert("Codigo: "+imageData.text);
            $scope.producto.codbar=imageData.text;

            // cordova.InAppBrowser.open(imageData.text, '_blank', 'location=yes');
            //console.log("format" + imageData.format)

          }, function(error){
            console.log("un error ha sucedido" + error);
          });

        }

    });

      $scope.Guardar=function(){

         // A confirm dialog
           var confirmPopup = $ionicPopup.confirm({
             title: 'Guardando Producto',
             template: '¿Está seguro que desea guardar con los cambios hechos?'
           });

           confirmPopup.then(function(res) {
             if(res) {
               console.log('You are sure');
               ///////////////////SLIM/////////////
                $http.put('http://elmejorprecio.esy.es/Datos/productos',$scope.producto)
                .then(function(respuesta) {       
                     //aca se ejetuca si retorno sin errores        
                console.log(respuesta.data);
                $state.go("Menu.grillaProducto");

                },function errorCallback(response) {        
                    //aca se ejecuta cuando hay errores
                    console.log( response);           
                });
             } else {
               console.log('You are not sure');
             }
           });


      }


    }else
      $state.go("login");

})

.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader, $auth, $ionicPopup)
{

  if($auth.isAuthenticated())
  {
  $scope.usuario={};
  $scope.DatoTest="Modificar Usuario";
  // $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  // $scope.uploader.queueLimit = 1;
  $scope.usuario.id=$stateParams.id;
  $scope.usuario.correo=$stateParams.correo;
  $scope.usuario.nombre=$stateParams.nombre;
  $scope.usuario.clave=$stateParams.clave;
  $scope.usuario.tipo=$stateParams.tipo;
  $scope.usuario.foto=$stateParams.foto;



      $scope.Guardar=function(usuario)
      {

          var confirmPopup = $ionicPopup.confirm({
                title: 'Guardando Usuario',
                template: '¿Está seguro que desea guardar los datos del usuario editado?'
          });

          confirmPopup.then(function(res) {
              if(res) {
                  console.log('You are sure');

                  $http.put('http://elmejorprecio.esy.es/Datos/usuarios',$scope.usuario)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("Menu.grillaUsuario");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });
                  
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
      // alert("estoy en el ionicView");
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
               $http.delete('http://elmejorprecio.esy.es/Datos/usuarios/'+usuario.id)
                .then(function(respuesta) {      
               //aca se ejetuca si retorno sin errores        
               // alert(respuesta.data);
               FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

                $scope.ListadoUsuarios=respuesta;
       
              });

              },function errorCallback(response) {        
                  //aca se ejecuta cuando hay errores
                  alert(response.status);           
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

  }else
  $state.go("login");

    
})


.controller('controlAltaUsuario', function($scope, $http ,$state, FileUploader, cargadoDeFoto, $auth, $ionicPopup) {

  if($auth.isAuthenticated())
  {
        $scope.DatoTest="Alta Usuario";

        // $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
        // $scope.uploader.queueLimit = 1;

        //inicio las variables
        $scope.usuario={};
        $scope.usuario.correo= "pepe@pepe.com" ;
        $scope.usuario.nombre= "pepe" ;
        $scope.usuario.clave= "9876" ;
        $scope.usuario.tipo= "empleado" ;
        $scope.usuario.foto="pordefecto.png";
        
        // cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);
       

        $scope.Guardar=function(usuario){

            var confirmPopup = $ionicPopup.confirm({
                 title: 'Guardando Usuario',
                template: '¿Está seguro que desea guardar el usuario '+ usuario.nombre+'?'
               });

               confirmPopup.then(function(res) {
                 if(res) {

                   console.log('You are sure');

                   $http.post('http://elmejorprecio.esy.es/Datos/usuarios',$scope.usuario)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("Menu.inicio");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });
                   
                 } else {
                   console.log('You are not sure');
                 }
               });
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

       return $http.get('http://elmejorprecio.esy.es/Datos/productos')
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

       return $http.get('http://elmejorprecio.esy.es/Datos/usuarios')
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
