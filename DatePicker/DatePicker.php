<?php

namespace Wafl\Controls\DatePicker;

class DatePicker
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
        return "DatePicker/Presentation/DefaultSkin/Html/DatePicker.tpl";
    }

    public function GetRequiredParams()
    {
        return array("Id");
    }

    public function GetParamDefaultValue($paramName)
    {
        switch ($paramName)
        {
            case "Id":
                return "DatePicker_" . substr(md5(microtime(true)), 0, 7);
                break;
            default:
                return null;
                break;
        }
    }
}