/*
 *@namespace Wafl.Controls.ModelList
 */
Namespace("Wafl.Controls.ModelList");

/*
 *@class ModelList
 *@extends Class
 */
Wafl.Controls.ModelList.ModelList = Class.extend(
    {
        init: function ()
        {
            $$class("EditModel")
                .OnEach(
                    function (button)
                    {
                        button
                            .AddClickHandler(
                                function ()
                                {
                                    var uiid = this.GetAttribute("uiid");
                                    var modelType = this.GetAttribute("modelType");
                                    $(uiid)
                                        .ShowDialog(modelType + " Editor",
                                            function ()
                                            {
                                                alert("saved");
                                            },
                                            null, null, null, null, null, "Save " + modelType, "Close");
                                });
                    });
            $$class("DeleteModel")
                .OnEach(
                    function (button)
                    {
                        button
                            .AddClickHandler(
                                function ()
                                {
                                    if (confirm("Are you sure you want to delete this model?"))
                                    {
                                        var modelid = button.GetAttribute("modelid");
                                        var modeltype = button.GetAttribute("modeltype");
                                        var trElems = $$class(modeltype + "_" + modelid);
                                        DblEj.Data.Model.DeleteByKey(modeltype, modelid);
                                        trElems.OnEach(
                                            function (trElem)
                                            {
                                                trElem
                                                    .Pulse(20, null, function ()
                                                    {
                                                        this.FadeOut(5,
                                                            function ()
                                                            {
                                                                this.Remove()
                                                            }.Bind(this));
                                                    }.Bind(trElem));
                                            });
                                    }
                                });
                    });
        }
    });