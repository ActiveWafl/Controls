<?php

namespace Wafl\Controls\LoginForm;

class LoginForm
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
        return "LoginForm/Presentation/LoginForm.tpl";
    }

    public static function Get_Javascripts()
    {
        return array();
    }
}