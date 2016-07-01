<?php

namespace Wafl\Controls\ModelEditor;

class ModelEditor
extends \DblEj\Extension\ControlBase
{

    public function Initialize($width, $height, &$params)
    {
        $model = null;
        if (isset($params["Model"]) && $params["Model"])
        {
            $model = $params["Model"];
        }
        else if (isset($params["ModelType"]))
        {
            $modelType = $params["ModelType"];
            if (!class_exists($modelType))
            {
                throw new \Exception("Invalid model type ($modelType) specified for the ModelEditor control (make sure you use the fully qualified name)");
            }
            $model = new $modelType();
        }
        if ($model)
        {
            $class     = new \ReflectionClass($model);
            $className = $class->getName();
            if ($className::Get_HasStaticFieldNames())
            {
                $properties = $className::Get_FieldNames(\Wafl\Core::$STORAGE_ENGINE);
            }
            else
            {
                //@todo: shouldn't this be Get_InstanceFieldNames?
                $properties = $model->Get_FieldNames(\Wafl\Core::$STORAGE_ENGINE);
            }
            if (isset($params["HideColumns"]))
            {
                foreach (explode(",", $params["HideColumns"]) as $hideColumnIdx => $hideColumn)
                {
                    foreach ($properties as $propertyIdx => $property)
                    {
                        if ($property == $hideColumn)
                        {
                            unset($properties[$propertyIdx]);
                            break;
                        }
                    }
                }
            }
            $this->SetTemplateVariable("QUALIFIED_MODEL_TYPE", $className);
            $this->SetTemplateVariable("MODEL_TYPE", $class->getShortName());
            $this->SetTemplateVariable("PROPERTIES", $properties);
        }
        $this->SetTemplateVariable("EDIT_MODEL", $model);
    }

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "ModelEditor/Presentation/DefaultSkin/Html/ModelEditor.tpl";
    }
}