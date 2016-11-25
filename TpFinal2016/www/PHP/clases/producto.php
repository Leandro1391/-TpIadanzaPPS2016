<?php
require_once"AccesoDatos.php";
class producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $local;
	public $localidad;
	public $direccion;
 	public $precio;
 	public $codbar;
 	public $foto;
 	public $fecha;


//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetLocal()
	{
		return $this->local;
	}
	public function GetLocalidad()
	{
		return $this->localidad;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}
	public function GetCodbar()
	{
		return $this->codbar;
	}
	public function GetFoto()
	{
		return $this->foto;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetLocal($valor)
	{
		$this->local = $valor;
	}
	public function SetLocalidad($valor)
	{
		$this->localidad = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}
	public function SetCodbar($valor)
	{
		$this->codbar = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
	
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Producto::TraerUnLocal($id);

			$this->id = $id;		
			$this->nombre = $obj->nombre;
			$this->local = $obj->local;
			$this->localidad = $obj->localidad;
			$this->direccion = $obj->direccion;
			$this->precio = $obj->precio;
			$this->codbar = $obj->codbar;
			$this->foto = $obj->foto;
			$this->fecha = $obj->fecha;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->local."-".$this->localidad."-".$this->direccion."-".$this->precio."-".$this->codbar."-".$this->foto."-".$this->fecha;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misproductos WHERE id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnProducto(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('producto');
		return $informeBuscado;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misproductos");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasProductos() ");
		$consulta->execute();			
		$arrInformes= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrInformes;
	}

	public static function TraerProductosPorPrecio()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misproductos ORDER BY precio");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrPersonas;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM misproductos	WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarProducto(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE misproductos set nombre=:nombre,local=:local,localidad=:localidad,direccion=:direccion,precio=:precio,codbar=:codbar,foto=:foto,fecha=:fecha WHERE id=:id");
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':local',$producto->local, PDO::PARAM_STR);
			$consulta->bindValue(':localidad',$producto->localidad, PDO::PARAM_STR);
			$consulta->bindValue(':direccion', $producto->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':codbar', $producto->codbar, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $producto->fecha, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into misproductos (nombre,local,localidad,direccion,precio,codbar,foto,fecha)values(:nombre,:local,:localidad,:direccion,:precio,:codbar,:foto,:fecha)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarlocal (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':local',$producto->local, PDO::PARAM_STR);
		$consulta->bindValue(':localidad',$producto->localidad, PDO::PARAM_STR);				
		$consulta->bindValue(':direccion', $producto->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
		$consulta->bindValue(':codbar', $producto->codbar, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $producto->fecha, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}		


}
