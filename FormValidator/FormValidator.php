<?php

namespace Wafl\Controls\FormValidator;

class FormValidator
extends \DblEj\Extension\ControlBase
{
    private $_validationType           = null;
    private static $_defaultDataLabels = array
    (
        "STRING"       => "string",
        "ALPHANUMERIC" => "alphanumeric string",
        "ALPHA"        => "alpha string",
        "NUMERIC"      => "numeric value",
        "INTEGER"      => "whole number",
        "EMAILADDRESS" => "email address",
        "IPV4ADDRESS"  => "ip address",
        "URI"          => "URI",
        "WEBURL"       => "Web URL",
        "PHONENUMBER"  => "phone number",
        "REGEX"        => "data value",
        "CUSTOM"       => "data value"
    );

    public function Initialize($width, $height, &$params)
    {
        if (!isset($params["PassCssClass"]))
        {
            $params["PassCssClass"] = "IconCheck";
        }
        if (!isset($params["FailCssClass"]))
        {
            $params["FailCssClass"] = "IconErrorAlt";
        }
        $this->_validationType = strtoupper($params["Type"]);
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public function GetOptionalParams()
    {
        return array(
            "PassCssClass",
            "FailCssClass",
            "MinValue",
            "MaxValue",
            "MinLength",
            "MaxLength",
            "DecimalPrecision",
            "ClientValidator",
            "ServerValidator",
            "DataLabel",
            "PassCaption",
            "FailCaption",
            "Regex");
    }

    public function GetRequiredParams()
    {
        return array("Type", "ElementId");
    }

    public static function Get_MainTemplate()
    {
        return "FormValidator/FormValidator.tpl";
    }

    public function GetParamDefaultValue($paramName)
    {
        $returnValue = null;
        switch ($paramName)
        {

            case "PassCssClass":
                $returnValue = "IconCheck";
                break;
            case "FailCssClass":
                $returnValue = "IconErrorAlt";
                break;
            case "MinValue":
                $returnValue = -999999999;
                break;
            case "MaxValue":
                $returnValue = 999999999;
                break;
            case "ClientValidator":
                $returnValue = "null";
                break;
            case "ServerValidator":
                $returnValue = "null";
                break;
            case "DecimalPrecision":
                $returnValue = 3;
                break;
            case "Regex":
                $returnValue = "null";
                break;
            case "MinLength":
                $returnValue = 0;
                break;
            case "MaxLength":
                $returnValue = 99999999;
                break;
            case "DataLabel":
                if (isset(self::$_defaultDataLabels[$this->_validationType]))
                {
                    $returnValue = self::$_defaultDataLabels[$this->_validationType];
                }
                else
                {
                    throw new \Wafl\Exceptions\FormValidatorException("The validation type (" . $this->_validationType . ") is invalid.");
                }
                break;
            default:
                $returnValue = null;
                break;
        }
        return $returnValue;
    }
}