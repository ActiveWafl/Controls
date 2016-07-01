<?php

namespace Wafl\Controls\MicroLoginForm;

class MicroLoginForm
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "MicroLoginForm/Presentation/MicroLoginForm.tpl";
    }

    public static function Get_Javascripts()
    {
        return array();
    }
}