<?php

namespace Wafl\Controls\Rotator;

use DblEj\Extension\ControlBase;
use DblEj\UI\Stylesheet;
use Wafl\Core;

class RotatorItem
extends ControlBase
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
        return "Rotator/Presentation/DefaultSkin/Html/RotatorItem.tpl";
    }

    public static function Get_Javascripts()
    {
        return array(
            "Rotator/RotatorItem.js");
    }
}