<?php

namespace Wafl\Controls\DropdownMenu;

class DropdownMenu
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        $caption     = isset($params["Caption"]) ? $params["Caption"] : null;
        $itemClass   = isset($params["Class"]) ? $params["Class"] : null;
        $buttonClass = isset($params["ButtonClass"]) ? $params["ButtonClass"] : null;
        $this->SetTemplateVariable("MENU_CAPTION", $caption);
        $this->SetTemplateVariable("ITEM_CLASS", $itemClass);
        $this->SetTemplateVariable("BUTTON_CLASS", $buttonClass);
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "DropdownMenu/Presentation/DefaultSkin/Html/DropdownMenu.tpl";
    }
}