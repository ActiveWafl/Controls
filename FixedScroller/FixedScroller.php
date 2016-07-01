<?php

namespace Wafl\Controls\FixedScroller;

class FixedScroller
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
        return "FixedScroller/FixedScroller.tpl";
    }
    public static function Get_Javascripts()
    {
        return [];
    }
}