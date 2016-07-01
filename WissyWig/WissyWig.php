<?php

namespace Wafl\Controls\WissyWig;

class WissyWig
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        $textAreaId = isset($params["TextAreaId"])?$params["TextAreaId"]:uniqid();
        $toolbarId = isset($params["ToolbarId"])?$params["ToolbarId"]:uniqid();
        $cssFile = isset($params["CssFile"])?$params["CssFile"]:null;
        $textAreaHeight = isset($params["TextAreaHeight"])?$params["TextAreaHeight"]:"100%";
        $textColors = isset($params["TextColors"])?explode(",", $params["TextColors"]):["black", "red"];
        $startValue = isset($params["StartHtml"])?$params["StartHtml"]:"";
        $this->SetTemplateVariable("TEXTAREA_ID", $textAreaId);
        $this->SetTemplateVariable("TOOLBAR_ID", $toolbarId);
        $this->SetTemplateVariable("TEXT_COLORS", $textColors);
        $this->SetTemplateVariable("TEXT_COLORS_STRING", implode(",", $textColors));
        $this->SetTemplateVariable("CSS_FILE", $cssFile);
        $this->SetTemplateVariable("START_HTML", $startValue);
        $this->SetTemplateVariable("TEXTAREA_HEIGHT", $textAreaHeight);
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "WissyWig/Presentation/WissyWig.tpl";
    }
    
    public function GetOptionalParams()
    {
        return array(
            "TextAreaId",
            "ToolbarId",
            "TextColors",
            "CssFile");
    }

    public function GetParamDefaultValue($paramName)
    {
        switch ($paramName)
        {
            case "TextAreaId":
                return uniqid();
                break;
            case "ToolbarId":
                return uniqid();
                break;
            case "TextColors":
                return ["black", "red"];
                break;
            case "CssFile":
                return null;
                break;
        }
    }

    public static function Get_Javascripts()
    {
        return array(["File"=>"Resources/advanced.js"], ["File"=>"Resources/wysihtml5-0.3.0.min.js", "Minify" => false], ["File"=>"WissyWig.js"]);
    }
}