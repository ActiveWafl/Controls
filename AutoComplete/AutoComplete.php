<?php

namespace Wafl\Controls\AutoComplete;

class AutoComplete
extends \DblEj\Extension\ControlBase
{
    private $_dataSourceApi;
    private $_dataSourceApiArg;

    public function Initialize($width, $height, &$params)
    {
        parent::Initialize($width, $height, $params);
        $this->_dataSourceApi  = isset($params["DataSourceApi"]) ? $params["DataSourceApi"] : null;
        $this->_dataSourceApiArg  = isset($params["DataSourceApiArg"]) ? $params["DataSourceApiArg"] : null;
    }
    
    public static function Get_Dependencies()
    {
        return null;
    }

    public function GetRequiredParams()
    {
        return ["DataSourceApi", "DataSourceApiArg"];
    }

    public function GetOptionalParams()
    {
        return ["Id"];
    }

    public function GetParamDefaultValue($paramName)
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "AutoComplete/Presentation/DefaultSkin/Html/AutoComplete.tpl";
    }
}