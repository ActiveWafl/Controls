/*
 *@namespace Wafl.Controls.ModelEditor
 */
Namespace("Wafl.Controls.ModelEditor");

/*
 *@class ModelEditor
 *@extends Class
 */
Wafl.Controls.ModelEditor.ModelEditor = Class.extend(
    {
        init: function (modelEditorDivId, modelType, modelId)
        {
            this._modelType = modelType;
            this._modelId = modelId;
            this._modelEditorDivId = modelEditorDivId;
        }
    });