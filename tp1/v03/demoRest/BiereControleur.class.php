<?php
/**
 * Class BiereControleur
 * Controleur de la ressource Biere
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-31
 * @license MIT
 */

  
class BiereControleur 
{
	/**
	 * Méthode qui gère les action en GET
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function getAction(Requete $oReq)
	{
		$res = array();
		
		
        return $res;	
	}
	
	/**
	 * Méthode qui gère les action en POST
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function postAction(Requete $oReq)	// Modification
	{
		
	}
	
	/**
	 * Méthode qui gère les action en PUT
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function putAction(Requete $oReq)		//ajout ou modification
	{
		
	}
	
	/**
	 * Méthode qui gère les action en DELETE
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function deleteAction(Requete $oReq)
	{
		
		
	}
	
	
	
	/**
	 * Retourne les informations de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les informations de la bière
	 * @access private
	 */	
	private function getBiere($id_biere)
	{
		$res = Array();
		return $res; 
	}
	
	/**
	 * Retourne les informations des bières de la db	 
	 * @return Array Les informations sur toutes les bières
	 * @access private
	 */	
	private function getListeBiere()
	{
		$res = Array();
		return $res; 
	}
	
	/**
	 * Retourne les commentaires de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les commentaires de la bière
	 * @access private
	 */	
	private function getCommentaire($id_biere)
	{
		$res = Array();
		return $res; 
	}

	/**
	 * Retourne la note moyenne et le nombre de note de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les commentaires de la bière
	 * @access private
	 */	
	private function getNote($id_biere)
	{
		
		$res = Array();
		return $res; 
	}
	
	/**
	 * Valide les données d'authentification du service web
	 * @return Boolean Si l'authentification est valide ou non
	 * @access private
	 */	
	private function valideAuthentification()
    {
        
      return true;
    }
		
}
