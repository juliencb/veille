<?php
/**
 * Class Requete
 * Gère les requêtes HTTP (Router)
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-03
 * @license MIT
 * @see http://www.lornajane.net/posts/2012/building-a-restful-php-server-understanding-the-request
 */

class Requete 
{
	
    public $verbe;
    public $parametres;
    public $url_element;
	
    public function __construct() {
        
        $this->verbe = $_SERVER['REQUEST_METHOD'];
        $_GET["url"] = $trim($GET["url"], '\/');  // enleve tous les / et les \ en trop
        $this->url_element = explode("/", $_GET["url"]); 
        $this->traitementParametre();
        
        
	}
	/**
	 * Décode les paramètres de la requête
	 * @access private
	 */
	private function traitementParametre() {
        $parametres = array();
        if(isset($_SERVER["QUERY_STRING"])){
            parse_str($_SERVER["QUERY_STRING"], $parametres);
            unset($parametres["url"]);
            
        }
        
        $donnes_brut = file_get_contents("php://input"); // va chercher le contenu de la requete peu importe le verbe
        
        
         $content_type = false;
        if(isset($_SERVER['CONTENT_TYPE'])){
            $content_type = $_SERVER['CONTENT_TYPE'];
        }
        switch($content_type){
                case "application/json":
                    $donnees = json_decode($donnes_brut);
                    if($donnees){
                        for($donnees as $nom => $valeur){
                            $parametres[$nom] this->aseptiserParametre($valeur);
                        }
                    }
                    break;
            default:
                $this->erreur(400);
        }
    }
	
	/**
	 * Permet de nettoyer les valeurs passées en paramètre
	 * @param String $valeur Valeur à filtrer
	 * @return String La valeur filtrer.
	 * @access private
	 */
	private function aseptiserParametre($valeur)
	{  
		
		return $valeur;
	}
	
	/**
	 * Génère le code d'erreur passé en paramètre
	 * @access public
	 */	
	public function erreur($code)
	{
		http_response_code($code);
		
		
		
	}
}
?>