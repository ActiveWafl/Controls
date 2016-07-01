<?php

namespace Wafl\Controls\Spinner;

class Spinner
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        $htmlAttributes = "";

        //any parameter that we dont expect as a control parameter will be passed through as an html element attribute
        $expectedParams = ["name", "namespace", "AllowNull", "CssClass", "UseNativeSpinner", "Precision", "Required", "Placeholder", "MaxLen", "MinLen", "MaxValue", "MinValue", "Id", "PostName", "Value", "Width"];
        foreach ($params as $paramName=>$paramValue)
        {
            if (array_search($paramName, $expectedParams) === false)
            {
                $htmlAttributes .= "$paramName=\"$paramValue\" ";
            }
        }
        $htmlAttributes = trim($htmlAttributes);
        $this->SetTemplateVariable("HTML_ATTRIBUTES", $htmlAttributes);

        if (!isset($params["Precision"]))
        {
            if (isset($params["SmallStep"]))
            {
                $smallStep = trim($params["SmallStep"]);
                $smallStepPrecision = max(0, (strlen(strrchr($smallStep, "."))-1));
                $params["Precision"] = $smallStepPrecision;
            }
            elseif (isset($params["LargeStep"]))
            {
                $largeStep = trim($params["LargeStep"]);
                $largeStepPrecision = max(0, (strlen(strrchr($largeStep, "."))-1));
                $params["Precision"] = $largeStepPrecision;
            }
        }
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "Spinner/Presentation/DefaultSkin/Html/Spinner.tpl";
    }
}