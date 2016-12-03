<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */

require '../PHP/clases/AccesoDatos.php';
require '../PHP/clases/producto.php';
require '../PHP/clases/usuario.php';
require '../PHP/clases/informe.php';
require '../vendor/autoload.php';
/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

$c = $app->getContainer();
$c['errorHandler'] = function ($c) {
    return function ($request, $response, $exception) use ($c) {
        return $c['response']->withStatus(500)
                             ->withHeader('Content-Type', 'text/html')
                             ->write('Something went wrong!');
    };
  };




/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');



$app->get('/productos[/]', function ($request, $response, $args) {
	
	$listado = producto::TraerTodosLosproductos();
	return json_encode($listado);
});

$app->get('/productos/{id}', function ($request, $response, $args) {
	
	$unProducto = producto::TraerUnProducto($args['id']);
	return json_encode($unProducto);
});


$app->delete('/productos/{id}', function ($request, $response, $args) {
	
	$listado=producto::BorrarProducto($args['id']);
   $response->write(json_decode($listado)); 
});

$app->post('/productos', function ($request,$args) {

	$datos=json_decode($request->getBody());
	producto::InsertarProducto($datos);
	
});

$app->put('/productos',function($request){
	$unproducto=json_decode($request->getBody());
	//$unUsuario->id_usuario=$id;
	producto::ModificarProducto($unproducto);
	

});



$app->get('/usuarios[/]', function ($request, $response, $args) {
	
	$listado = usuario::TraerTodosLosUsuarios();
	return json_encode($listado);
   
});

$app->get('/usuarios/{id}', function ($request, $response, $args) {
	
	$user = usuario::TraerUnUsuario($args['id']);
    return json_encode($user);
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
	
	$listado=usuario::BorrarUsuario($args['id']);
   $response->write(json_decode($listado)); 
    return $response;
});

$app->post('/usuarios', function ($request,$args) {
	$datos=json_decode($request->getBody());
	usuario::InsertarUsuario($datos);
});

$app->put('/usuarios',function($request){
	$unsuario=json_decode($request->getBody());
	//$unUsuario->id_usuario=$id;
	usuario::ModificarUsuario($unsuario);

});




$app->get('/informes[/]', function ($request, $response, $args) {
	
	$listado = informe::TraerTodosLosInformes();
	return json_encode($listado);
   
});

$app->get('/informes/{id}', function ($request, $response, $args) {
	
	$user = informe::TraerUnInforme($args['id']);
    return json_encode($user);
});

$app->delete('/informes/{id}', function ($request, $response, $args) {
	
	$listado=informe::BorrarInforme($args['id']);
   $response->write(json_decode($listado)); 
    return $response;
});

$app->post('/informes', function ($request,$args) {
	$datos=json_decode($request->getBody());
	informe::InsertarInforme($datos);
});

$app->put('/informes',function($request){
	$uninforme=json_decode($request->getBody());
	//$uninforme->id_informe=$id;
	informe::ModificarInforme($uninforme);

});

$app->run();
