<?php

namespace Wafl\Controls\Rotator;

class Rotator
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        if (!isset($params["BackNavX"]))
        {
            $params["BackNavX"] = 10;
        }
        if (!isset($params["BackNavY"]))
        {
            $params["BackNavY"] = 10;
        }
        if (!isset($params["ForwardNavX"]))
        {
            $params["ForwardNavX"] = 60;
        }
        if (!isset($params["ForwardNavY"]))
        {
            $params["ForwardNavY"] = 10;
        }
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "Rotator/Presentation/DefaultSkin/Html/Rotator.tpl";
    }
}
?>