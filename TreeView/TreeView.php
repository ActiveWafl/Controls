<?php

namespace Wafl\Controls\WissyWig;

class WissyWig
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, $params)
    {
        
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "TreeView.tpl";
    }
}