<?php

namespace Wafl\Controls\DropdownButton;

class DropdownButton
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        $caption        = isset($params["Caption"]) ? $params["Caption"] : null;
        $buttonTitle        = isset($params["Title"]) ? $params["Title"] : null;
        $buttonClass    = isset($params["ButtonClass"]) ? $params["ButtonClass"] : null;
        $cssClass       = isset($params["CssClass"]) ? $params["CssClass"] : null;
        $onClick       = isset($params["OnClick"]) ? $params["OnClick"] : "";

        $buttonPosition = isset($params["ButtonPosition"]) ? $params["ButtonPosition"] : "left";
        $buttonId       = isset($params["ButtonId"]) ? $params["ButtonId"] : "Button_".\DblEj\Util\Strings::GenerateRandomString(8);
        $cssStyle       = isset($params["Style"]) ? $params["Style"] : "";
        $containerCssStyle       = isset($params["ContainerStyle"]) ? $params["ContainerStyle"] : "";
        $containerId       = isset($params["ContainerId"]) ? $params["ContainerId"] : "";
        $dropdownStyle       = isset($params["DropdownStyle"]) ? $params["DropdownStyle"] : "";

        $this->SetTemplateVariable("BUTTON_POSITION", $buttonPosition);
        $this->SetTemplateVariable("BUTTON_CAPTION", $caption);
        $this->SetTemplateVariable("BUTTON_CLASS", $buttonClass);
        $this->SetTemplateVariable("BUTTON_TITLE", $buttonTitle);

        $this->SetTemplateVariable("ON_CLICK", $onClick);
        $this->SetTemplateVariable("BUTTON_ID", $buttonId);
        $this->SetTemplateVariable("CSS_CLASS", $cssClass);
        $this->SetTemplateVariable("CSS_STYLE", $cssStyle);
        $this->SetTemplateVariable("CONTAINER_CSS_STYLE", $containerCssStyle);
        $this->SetTemplateVariable("DROPDOWN_STYLE", $dropdownStyle);
        $this->SetTemplateVariable("CONTAINER_ID", $containerId);
    }

    public static function Get_Dependencies()
    {
		$depends = new DependencyCollection();
		$depends->AddDependency("DropdownButton", \DblEj\Extension\Dependency::TYPE_CONTROL, "DropdownMenu");
		return $depends;
    }

    public static function Get_MainTemplate()
    {
        return "DropdownButton/Presentation/DefaultSkin/Html/DropdownButton.tpl";
    }
}