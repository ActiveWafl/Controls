<?php

namespace Wafl\Controls\Timeline;

class Timeline
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        if (!isset($params["Id"]))
        {
            $params["Id"] = "Timeline_" . uniqid();
        }
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "Timeline/Presentation/DefaultSkin/Html/Timeline.tpl";
    }
}