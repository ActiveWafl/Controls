<?php

namespace Wafl\Controls\Captcha;

class Captcha
extends \DblEj\Extension\ControlBase
{
    private static $_crackDifficulty;

    public function Initialize($width, $height, &$params)
    {
        self::$_crackDifficulty = isset($params["CrackDifficulty"])?$params["CrackDifficulty"]:4;
        $elementId              = isset($params["Id"]) ? $params["Id"] : "Captcha_" . $this->instanceId;
        $elementName            = isset($params["ElementName"]) ? $params["ElementName"] : $elementId;
        $resetActionVar         = isset($params["ResetAction"]) ? $params["ResetAction"] : "ResetCaptcha";
        $loadingAniUrl          = isset($params["LoadingAniUri"]) ? $params["LoadingAniUri"] : null;
        $this->SetTemplateVariable("ELEMENT_NAME", $elementName);
        $this->SetTemplateVariable("ELEMENT_ID", $elementId);
        $this->SetTemplateVariable("RESET_ACTION", $resetActionVar);
        $this->SetTemplateVariable("LOADING_ANI_URI", $loadingAniUrl);

        if (\DblEj\Communication\Http\Util::GetInput($resetActionVar, INPUT_REQUEST) != null)
        {
            \Wafl\Util\Captcha::ResetCaptcha();
        }
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "Captcha/Presentation/DefaultSkin/Html/Captcha.tpl";
    }

    public function GetOptionalParams()
    {
        return array(
            "CrackDifficulty",
            "Width",
            "Height",
            "LoadingAniUri");
    }

    public function GetParamDefaultValue($paramName)
    {
        switch ($paramName)
        {
            case "CrackDifficulty":
                return 3;
                break;
            case "Width":
                return 200;
                break;
            case "Height":
                return 80;
                break;
            case "LoadingAniUri":
                return null;
                break;
        }
    }
}