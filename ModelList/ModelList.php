<?php

namespace Wafl\Controls\ModelList;

class ModelList
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        if (isset($params["Models"]) && is_array($params["Models"]) && count($params["Models"]) > 0)
        {
            $firstModel = array_pop($params["Models"]);
            $class      = new \ReflectionClass($firstModel);
            $className  = $class->getName();
            if ($className::Get_HasStaticFieldNames())
            {
                $properties = $className::Get_FieldNames(\Wafl\Core::$STORAGE_ENGINE);
            }
            else
            {
                //@todo: shouldn't this be Get_InstanceFieldNames?
                $properties = $firstModel->Get_FieldNames(\Wafl\Core::$STORAGE_ENGINE);
            }
            $this->SetTemplateVariable("QUALIFIED_MODEL_TYPE", $className);
            $this->SetTemplateVariable("MODEL_TYPE", $class->getShortName());
            $this->SetTemplateVariable("PROPERTIES", $properties);
            $this->SetTemplateVariable("MODELS", $params["Models"]);
        }
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "ModelList/Presentation/DefaultSkin/Html/ModelList.tpl";
    }
}